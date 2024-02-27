import {
  Row,
  Button,
  Column,
  ComposedModal,
  Loading,
  ModalBody,
  ModalHeader,
  Slider,
  Stack,
  Theme,
  ModalFooter,
  ButtonSet,
  Checkbox,
} from "@carbon/react";
import { Add, View } from "@carbon/icons-react";
import "./charityModal.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatNumberToAmericanStandard } from "../../utils/formatUtils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { sendDonationRequest } from "../../services/donationService";
import { getLoyaltyPoints } from "../../redux/loyaltyPoints/loyaltyPointsSlice";
import { UVATION_REWARDS_DONATIONS } from "../../constants/redirectUrls";
import { toggleReadTerms } from "../../redux/toggleSlice/toggleSlice";
import { setTermsChecked } from "../../redux/checkout/checkoutSlice";
import useWindowSize from "../../hooks/useWindowSize";

const CharityModal = ({
  name,
  description,
  logoUrl,
  website,
  openModal,
  setOpenModal,
  ein,
}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const termsChecked = useSelector((state) => state.checkout.termsChecked);
  const loyaltyPoints = useSelector(
    (state) => state.loyaltyPoints.loyaltyPoints?.data?.loyaltyPointsBalance
  );
  const windowSize = useWindowSize();
  const formik = useFormik({
    initialValues: {
      sliderValue: 100,
    },
    validationSchema: Yup.object({
      sliderValue: Yup.number()
        .required("Donation value is required.")
        .min(100, "Donation value must be at least 100.")
        .test(
          "is-multiple-of-100",
          "Donation value should be a multiple of 100.",
          (value) => value % 100 === 0
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!termsChecked) {
        toast.error("Please accept the terms and conditions");
        return;
      }
      if (values?.sliderValue < 100 || values?.sliderValue % 100 !== 0) {
        toast.error(
          "Donation value should be 100 or more and must be a multiple of 100"
        );
        return;
      }
      const payload = {
        loyaltyPoints: values?.sliderValue,
        ein: `${ein}`,
        charityName: name,
      };
      setLoading(true);
      const response = await sendDonationRequest(payload);
      setLoading(false);
      if (!response.error) {
        toast.success(response?.data?.data?.message);
        setOpenModal(false);
      } else {
        toast.error(response.error?.data?.message);
      }
    },
  });

  const handleSliderChange = (sliderValue) => {
    formik.setFieldValue("sliderValue", sliderValue);
    formik.setFieldTouched("sliderValue", true);
  };

  useEffect(() => {
    dispatch(getLoyaltyPoints());
  }, []);

  return (
    <>
      <Theme
        theme={theme.bgTheme}
        as={ComposedModal}
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="charityModal"
        size="md"
      >
        {loading && <Loading />}
        <ModalHeader />
        <ModalBody>
          <Stack gap={7}>
            <Row>
              <Column lg={16} md={8} sm={4}>
                <div className="charityModalLogo">
                  <img src={logoUrl} alt={name} />
                </div>
              </Column>
            </Row>

            <Row>
              <Column lg={16} md={8} sm={4} className="mb-05">
                <div className="fs-32 text-center fw-500">{name}</div>
              </Column>
              <Column lg={16} md={8} sm={4}>
                <div className="fs-16 fw-300">{description}</div>
              </Column>
            </Row>

            <Row>
              <Column
                lg={16}
                md={8}
                sm={4}
                className="mb-1 text-center fs-16 fw-500"
              >
                Loyalty Points available to redeem: $
                {formatNumberToAmericanStandard(loyaltyPoints)}
              </Column>
              <Column lg={16} md={8} sm={4} className="mb-1">
                <Slider
                  id="sliderValue"
                  name="sliderValue"
                  ariaLabelInput="Lower bound"
                  labelText="Points to Donate"
                  max={loyaltyPoints || 100}
                  min={100}
                  step={100}
                  stepMultiplier={100}
                  required
                  value={formik.values.sliderValue}
                  onChange={({ value }) => handleSliderChange(value)}
                  onBlur={formik.handleBlur}
                  invalid={formik.errors.sliderValue}
                  invalidText={formik.errors.sliderValue}
                  warn={formik.errors.sliderValue}
                  warnText="The donation value should be multiple of 100."
                  hideTextInput={windowSize?.width > 672 ? false : true}
                />
              </Column>

              <Column
                lg={16}
                md={8}
                sm={4}
                className="text-center fs-16 fw-500 mb-1"
              >
                <span style={{ color: "#2570fe" }}>
                  {formatNumberToAmericanStandard(
                    Math.min(
                      Math.max(formik.values.sliderValue, 0),
                      loyaltyPoints
                    ) || 0
                  )}{" "}
                </span>
                <span>Loyalty Points = </span>
                <span style={{ color: "#42be65" }}>
                  $
                  {formatNumberToAmericanStandard(
                    Math.min(
                      Math.max(formik.values.sliderValue, 0),
                      loyaltyPoints
                    ) / 100
                  )}{" "}
                </span>
                <span>Donated</span>
              </Column>

              <Column lg={16} md={8} sm={4}>
                <Link
                  to={UVATION_REWARDS_DONATIONS}
                  target="blank"
                  className="h-14 fw-400 text-secondary"
                >
                  Learn more about donating with Uvation
                </Link>
              </Column>
            </Row>

            <Row>
              <Column lg={16} md={8} sm={4}>
                <Checkbox
                  labelText={
                    <>
                      I agree to the Uvation Rewards{" "}
                      <span
                        onClick={() => dispatch(toggleReadTerms())}
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                          color: "#2570fe",
                        }}
                      >
                        Terms of Services Agreement
                      </span>
                    </>
                  }
                  id="terms"
                  checked={termsChecked}
                  onChange={(e) => {
                    dispatch(setTermsChecked(e.target.checked));
                  }}
                />
              </Column>
            </Row>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <ButtonSet>
            <Button
              kind="secondary"
              disabled={!website}
              size="md"
              as={Link}
              to={website ? website : null}
              target={website ? "_blank" : null}
            >
              Visit Site <View />
            </Button>
            <Button
              kind="primary"
              onClick={formik.handleSubmit}
              size="md"
              disabled={formik.values.sliderValue > loyaltyPoints}
            >
              Donate <Add />
            </Button>
          </ButtonSet>
        </ModalFooter>
      </Theme>
    </>
  );
};

export default CharityModal;
