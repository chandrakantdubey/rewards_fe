import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setAddress,
  setFreeGiftItem,
  setFreeGiftItemCurrentIndex,
  setFreeGiftItemSelected,
  setOpenGiftItemCheckout,
  setTermsChecked,
} from "../../redux/checkout/checkoutSlice";
import { placeFreeGiftOrderService } from "../../services/orderService";
import {
  Theme,
  InlineLoading,
  ComposedModal,
  ProgressIndicator,
  Loading,
  ModalHeader,
  ModalBody,
  Stack,
  Row,
  Column,
  ProgressStep,
  ModalFooter,
  Button,
  TileGroup,
  RadioTile,
} from "@carbon/react";
import { Currency } from "@carbon/icons-react";
import rewardsApi from "../../api/rewardsApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PurchaseCard } from "../../components/purchaseCard/PurchaseCard";
import ConfirmOrder from "../../components/confirmOrder/ConfirmOder";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import Terms from "../../components/terms/Terms";
import ConfirmOrderDetails from "../../components/confirmOrderDetails/ConfirmOrderDetails";
import { formatNumberToAmericanStandard } from "../../utils/formatUtils";
import { getFreeGiftItems } from "../../redux/marketPlace/freeProductsSlice";

export default function RedeemFreeGiftItem() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [validatingAddress, setValidatingAddress] = useState(false);

  const theme = useSelector((state) => state.theme);
  const freeGiftItemCurrentIndex = useSelector(
    (state) => state.checkout.freeGiftItemCurrentIndex
  );
  const userData = useSelector((state) => state.user.userData.data?.data);
  const termsChecked = useSelector((state) => state.checkout.termsChecked);
  const openGiftItemCheckout = useSelector(
    (state) => state.checkout.openGiftItemCheckout
  );
  const freeGiftItem = useSelector((state) => state.checkout.freeGiftItem);
  const address = useSelector((state) => state.checkout.address);
  const freeGiftItemSelected = useSelector(
    (state) => state.checkout.freeGiftItemSelected
  );

  const otpInputRef = useRef(null);

  const placeOrder = async () => {
    console.log(otpInputRef);
    if (otpInputRef.current === null || otpInputRef.current === undefined) {
      toast.error("Please enter otp.");
      return;
    }
    setLoading(true);
    const newData = {
      id: freeGiftItem?.id,
      email: userData?.email,
      opted: freeGiftItemSelected,
      otp: otpInputRef.current.value,
      shippingAddress: {
        city: address?.city,
        postcode: address?.postCode,
        state: address?.state,
        street: address?.street,
        firstname: address?.firstName || "",
        lastname: address?.lastName || "",
        telephone: address?.telephone || "",
      },
    };
    try {
      const response = await placeFreeGiftOrderService(newData);
      if (response?.data) {
        const message = response?.data?.data?.message;
        setLoading(false);
        toast.success(message);
        dispatch(setFreeGiftItemCurrentIndex(4));
        dispatch(setTermsChecked(false));
        dispatch(setFreeGiftItemSelected(""));
        dispatch(getFreeGiftItems());
      }
      if (response?.error) {
        toast.error(response?.error?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  async function validateAddress(values) {
    setValidatingAddress(true);
    const formValues = {
      country: "US",
      state: values?.state,
      zip: values?.postCode,
      city: values?.city,
      street: values?.street,
    };
    try {
      const res = await rewardsApi.post("public/validate-address", formValues);
      if (res?.status === 200) {
        toast.success("Address validated successfully");
        dispatch(setAddress(values));
        dispatch(setFreeGiftItemCurrentIndex(2));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setValidatingAddress(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: userData?.name || "",
      lastName: userData?.last_name || "",
      telephone: userData?.phoneNumber || "",
      country: userData?.country || "",
      street: userData?.address || "",
      city: userData?.city || "",
      state: userData?.state || "",
      postCode: userData?.postalCode || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      telephone: Yup.string()
        .required("Phone is required")
        .matches(/^[0-9]+$/, "Phone must be a number")
        .min(10, "Phone must be at least 10 digits")
        .max(10, "Phone cannot be more than 10 digits"),
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      postCode: Yup.string()
        .required("Post Code is required")
        .matches(/^[0-9]+$/, "Post Code must be a number")
        .min(5, "Post Code must be at least 5 digits")
        .max(6, "Post Code cannot be more than 6 digits"),
    }),
    enableReinitialize: true,
  });

  return (
    <Theme
      theme={theme.bgTheme}
      as={ComposedModal}
      open={openGiftItemCheckout}
      onClose={() => {
        dispatch(setOpenGiftItemCheckout(false));
        dispatch(setFreeGiftItem({}));
        dispatch(setFreeGiftItemCurrentIndex(0));
        dispatch(setFreeGiftItemSelected(""));
      }}
      className="checkoutModal"
      size="lg"
    >
      {loading && <Loading />}
      <ModalHeader
        title={
          freeGiftItemCurrentIndex < 4
            ? "Checkout"
            : "Thank you for your order!"
        }
      />
      <ModalBody>
        <Stack gap={6}>
          <Row className="py-1">
            <Column lg={16} md={8} sm={4}>
              <ProgressIndicator
                currentIndex={freeGiftItemCurrentIndex}
                spaceEqually
              >
                <ProgressStep index={0} label="Review" />
                <ProgressStep index={1} label="Shipping" />
                <ProgressStep index={2} label="Terms" />
                <ProgressStep index={3} label="Confirm" />
              </ProgressIndicator>
            </Column>
          </Row>

          <Row>
            <Column lg={16} md={8} sm={4}>
              <div className="fs-16 fw-500">
                {freeGiftItemCurrentIndex === 0 &&
                  "Review Your Cart: Select the product or the points."}
                {freeGiftItemCurrentIndex === 1 &&
                  "Enter Your Shipping Information"}
                {freeGiftItemCurrentIndex === 2 &&
                  "Uvation Rewards Terms of Services Agreement"}
                {freeGiftItemCurrentIndex === 3 && "Confirm Your Order"}
                {freeGiftItemCurrentIndex === 4 && "Your Order"}
              </div>
            </Column>
          </Row>

          <Row>
            <Column lg={16} md={8} sm={4}>
              {freeGiftItemCurrentIndex === 0 && (
                <>
                  <TileGroup
                    onChange={(e) => {
                      dispatch(setFreeGiftItemSelected(e));
                    }}
                    defaultSelected="FREE_ITEM"
                    name="free gift item tile group"
                  >
                    <RadioTile
                      id="free-gift-item-radio-tile-1"
                      value="FREE_ITEM"
                      style={{
                        marginBottom: "1rem",
                      }}
                    >
                      <PurchaseCard
                        trashCan={false}
                        productDetails={freeGiftItem}
                        key={freeGiftItem?.id}
                      />
                    </RadioTile>

                    <RadioTile
                      id="free-gift-item-radio-tile-2"
                      value="LOYALTY_POINTS"
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "1rem",
                          alignItems: "center",
                        }}
                      >
                        <Currency size={120} />
                        <span>
                          Avail{" "}
                          <strong
                            style={{ color: "#2570FE", fontWeight: "500" }}
                          >
                            {formatNumberToAmericanStandard(
                              freeGiftItem?.optionalLoyaltyPoints
                            )}{" "}
                          </strong>
                          Loyalty Points
                        </span>
                      </div>
                    </RadioTile>
                  </TileGroup>
                </>
              )}
              {freeGiftItemCurrentIndex === 1 && (
                <CheckoutForm formik={formik} />
              )}
              {freeGiftItemCurrentIndex === 2 && (
                <Terms theme={theme.bgTheme} />
              )}
              {freeGiftItemCurrentIndex === 3 && (
                <ConfirmOrder address={address} otpInput={otpInputRef} />
              )}
              {freeGiftItemCurrentIndex === 4 && (
                <ConfirmOrderDetails address={address} />
              )}
            </Column>
          </Row>
        </Stack>
      </ModalBody>

      <ModalFooter>
        {!(freeGiftItemCurrentIndex == 0 || freeGiftItemCurrentIndex == 4) && (
          <Button
            kind="secondary"
            onClick={() => {
              if (freeGiftItemCurrentIndex > 0) {
                dispatch(
                  setFreeGiftItemCurrentIndex(freeGiftItemCurrentIndex - 1)
                );
              }
            }}
          >
            Back
          </Button>
        )}
        <Button
          kind="primary"
          onClick={() => {
            if (freeGiftItemCurrentIndex === 0)
              dispatch(setFreeGiftItemCurrentIndex(1));
            else if (freeGiftItemCurrentIndex === 1) {
              validateAddress(formik.values);
            } else if (freeGiftItemCurrentIndex === 2 && termsChecked)
              dispatch(setFreeGiftItemCurrentIndex(3));
            else if (freeGiftItemCurrentIndex === 3) {
              placeOrder();
            } else if (freeGiftItemCurrentIndex === 4) {
              dispatch(setFreeGiftItemCurrentIndex(0));
              dispatch(setOpenGiftItemCheckout(false));
            } else {
              toast.error("Please fill all the fields");
            }
          }}
          disabled={
            (freeGiftItemCurrentIndex === 2 && !termsChecked) ||
            (freeGiftItemCurrentIndex === 0 && !freeGiftItemSelected)
          }
        >
          {(freeGiftItemCurrentIndex === 0 || freeGiftItemCurrentIndex === 2) &&
            "Next"}
          {freeGiftItemCurrentIndex === 1 &&
            (validatingAddress ? (
              <InlineLoading
                status="active"
                iconDescription="Validating Address"
                description="Validating Address..."
              />
            ) : (
              "Next"
            ))}
          {freeGiftItemCurrentIndex === 3 && " Confirm Your Order"}
          {freeGiftItemCurrentIndex === 4 && "Close Checkout"}
        </Button>
      </ModalFooter>
    </Theme>
  );
}
