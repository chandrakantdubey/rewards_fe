import "./giftCardDetailsModal.scss";
import {
  ComposedModal,
  Loading,
  ModalBody,
  ModalHeader,
  Row,
  Slider,
  Stack,
  Theme,
  Column,
  ModalFooter,
  Dropdown,
  Checkbox,
} from "@carbon/react";
import { getGiftCardById } from "../../redux/giftCard/giftCardSlice";
import { formatNumberToAmericanStandard } from "../../utils/formatUtils";
import { useEffect, useState } from "react";
import rewardsApi from "../../api/rewardsApi";
import { FREE_CARDS_REDEEM } from "../../constants/apiEndpoints";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleGiftCardModal,
  toggleReadTerms,
} from "../../redux/toggleSlice/toggleSlice";
import { getLoyaltyPoints } from "../../redux/loyaltyPoints/loyaltyPointsSlice";
import { getAdminConfig } from "../../redux/getAdminConfig/getAdminConfigSlice";
import { getTermsAndConditions } from "../../redux/subscribeToNewsletter/subscribeToNewsletterSlice";

export default function GiftCardDetailsModal() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const theme = useSelector((state) => state.theme);
  const giftCard = useSelector((state) => state.giftCards.giftCardById);
  const openModal = useSelector((state) => state.toggle.giftCardModal);
  const loyaltyPoints = useSelector(
    (state) => state.loyaltyPoints.loyaltyPoints?.data?.loyaltyPointsBalance
  );

  const giftCardLoyaltyAmount = useSelector(
    (state) => state.adminConfig.adminConfigData?.configData
  );

  const handleSliderChange = ({ value }) => {
    setSliderValue(value);
  };

  const redeemGiftCard = async (sliderValue) => {
    if (!termsChecked) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    if (sliderValue > loyaltyPoints) {
      toast.error(
        "You don't have enough loyalty points to redeem this gift card"
      );
      return;
    }

    setLoading(true);
    const data = {
      brands: [giftCard?.data?.brand?.brand_code],
      loyaltyPointsUsed: sliderValue,
      actualAmountInCents:
        (sliderValue / Number(giftCardLoyaltyAmount?.giftCardLoyaltyAmount)) *
        100,
    };
    try {
      const response = await rewardsApi.post(FREE_CARDS_REDEEM, data);
      if (response?.data) {
        toast.success(response?.data?.message);
        dispatch(toggleGiftCardModal({ open: false, brand_code: "" }));
      }
    } catch (err) {
      toast.error("Failed to redeem gift card");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getLoyaltyPoints());
  }, []);
  useEffect(() => {
    dispatch(getAdminConfig());
  }, []);
  useEffect(() => {
    dispatch(getTermsAndConditions());
  }, []);
  useEffect(() => {
    if (!openModal?.open) return;
    dispatch(getGiftCardById(openModal?.brand_code));
  }, [dispatch]);

  return (
    <>
      <Theme
        theme={theme.bgTheme}
        as={ComposedModal}
        open={openModal?.open}
        onClose={() =>
          dispatch(toggleGiftCardModal({ open: false, brand_code: "" }))
        }
        className="giftCardDetailsModal"
        size="md"
      >
        {(giftCard?.isLoading || loading) && <Loading withOverlay />}
        <ModalHeader />
        <ModalBody>
          <Stack gap={7}>
            <Row>
              <Column lg={16} md={8} sm={4}>
                <div className="giftCardDetailsModalLogo">
                  <img
                    src={giftCard?.data?.brand?.image_url}
                    alt={giftCard?.data?.brand?.brand_code}
                  />
                </div>
              </Column>
            </Row>

            <Row>
              <Column lg={16} md={8} sm={4}>
                <div className="text-center fs-32 fw-500">
                  {giftCard?.data?.brand?.name}
                </div>
              </Column>
            </Row>

            <Row>
              <Column lg={16} md={8} sm={4}>
                {giftCard?.data?.brand?.max_price_in_cents / 100 ? (
                  <div className="fw-500 fs-16 text-center">
                    Gift card price range: $
                    {formatNumberToAmericanStandard(
                      giftCard?.data?.brand?.min_price_in_cents / 100
                    ) ?? 0}{" "}
                    - $
                    {formatNumberToAmericanStandard(
                      giftCard?.data?.brand?.max_price_in_cents / 100
                    ) ?? 0}
                  </div>
                ) : (
                  <div className="fw-400 fs-16 text-center">
                    Gift card can be redeemed for a value of: $
                    {formatNumberToAmericanStandard(
                      giftCard?.data?.brand?.allowed_prices_in_cents[0]
                    ) ?? 0}{" "}
                    - ${" "}
                    {formatNumberToAmericanStandard(
                      giftCard?.data?.brand?.allowed_prices_in_cents[
                        giftCard?.data?.brand?.allowed_prices_in_cents.length -
                          1
                      ]
                    ) ?? 0}
                  </div>
                )}
              </Column>
            </Row>

            <Row>
              <Column lg={16} md={8} sm={4}>
                {giftCard?.data?.brand?.max_price_in_cents / 100 ? (
                  <>
                    <Slider
                      ariaLabelInput="Lower bound"
                      labelText={`Loyalty Points available to redeem ${formatNumberToAmericanStandard(
                        loyaltyPoints
                      )}`}
                      max={
                        (giftCard?.data?.brand?.max_price_in_cents / 100) *
                        giftCardLoyaltyAmount?.giftCardLoyaltyAmount
                      }
                      min={
                        (giftCard?.data?.brand?.min_price_in_cents / 100) *
                          giftCardLoyaltyAmount?.giftCardLoyaltyAmount || 0
                      }
                      step={
                        Number(giftCardLoyaltyAmount?.giftCardLoyaltyAmount) ||
                        0
                      }
                      stepMultiplier={
                        Number(giftCardLoyaltyAmount?.giftCardLoyaltyAmount) ||
                        0
                      }
                      onChange={handleSliderChange}
                      value={sliderValue || 0}
                      warnText="Enter a valid amount"
                      hideTextInput={true}
                    />
                    <div className="fw-500 fs-16 text-center">
                      <span style={{ color: "#2570fe" }}>
                        {formatNumberToAmericanStandard(sliderValue) || 0}{" "}
                      </span>
                      <span>Loyalty Points = </span>
                      <span style={{ color: "#42be65" }}>
                        $
                        {formatNumberToAmericanStandard(
                          sliderValue /
                            giftCardLoyaltyAmount?.giftCardLoyaltyAmount
                        )}{" "}
                      </span>
                      <span>Dollars</span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* <Dropdown
                      id="inline"
                      titleText="Inline dropdown label"
                      initialSelectedItem={
                        giftCard?.data?.brand?.allowed_prices_in_cents[1]
                      }
                      label="Option 1"
                      type="inline"
                      items={giftCard?.data?.brand?.allowed_prices_in_cents}
                      itemToString={(item) => (item ? item.text : "")}
                    /> */}
                    <div className="fw-500 fs-16 text-center">
                      <span style={{ color: "#2570fe" }}>
                        {formatNumberToAmericanStandard(
                          giftCard?.data?.brand?.allowed_prices_in_cents[0] *
                            giftCardLoyaltyAmount?.giftCardLoyaltyAmount
                        )}{" "}
                      </span>
                      <span>Loyalty Points = </span>
                      <span style={{ color: "#42be65" }}>
                        $
                        {formatNumberToAmericanStandard(
                          giftCard?.data?.brand?.allowed_prices_in_cents[0]
                        )}{" "}
                      </span>
                      <span>Dollars</span>
                    </div>
                  </>
                )}
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
                    setTermsChecked(e.target.checked);
                  }}
                />
              </Column>
            </Row>
          </Stack>
        </ModalBody>
        <ModalFooter
          primaryButtonText="Checkout"
          onRequestSubmit={() =>
            redeemGiftCard(
              giftCard?.data?.brand?.max_price_in_cents / 100
                ? sliderValue
                : giftCard?.data?.brand?.allowed_prices_in_cents[0]
            )
          }
        />
      </Theme>
    </>
  );
}
