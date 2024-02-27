import {
  Button,
  Column,
  ComposedModal,
  Loading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ProgressIndicator,
  ProgressStep,
  Row,
  Stack,
  Theme,
  InlineLoading,
} from "@carbon/react";
import "./checkoutModal.scss";
import { PurchaseCard } from "../purchaseCard/PurchaseCard";
import { useEffect, useRef, useState } from "react";
import Terms from "../terms/Terms";
import CheckoutForm from "../checkoutForm/CheckoutForm";
import ConfirmOrder from "../confirmOrder/ConfirmOder";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../redux/cart/cartSlice";
import { placeOrderService } from "../../services/orderService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setAddress,
  setOpenCheckout,
  setCurrentIndex,
  setTermsChecked,
} from "../../redux/checkout/checkoutSlice";
import ConfirmOrderDetails from "../confirmOrderDetails/ConfirmOrderDetails";
import rewardsApi from "../../api/rewardsApi";

const CheckoutModal = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const theme = useSelector((state) => state.theme);
  const [validatingAddress, setValidatingAddress] = useState(false);
  const currentIndex = useSelector((state) => state.checkout.currentIndex);

  const userData = useSelector((state) => state.user.userData.data?.data);
  const cartData = useSelector((state) => state.cart.cartData.data);

  const termsChecked = useSelector((state) => state.checkout.termsChecked);
  const openCheckout = useSelector((state) => state.checkout.openCheckout);
  const address = useSelector((state) => state.checkout.address);

  const otpInputRef = useRef(null);

  const placeOrder = async () => {
    setLoading(true);
    const newData = {
      email: userData?.email,
      shippingAddress: {
        city: address?.city,
        postCode: address?.postCode,
        state: address?.state,
        street: address?.street,
        firstName: address?.firstName || "",
        lastName: address?.lastName || "",
        telephone: address?.telephone || "",
      },
      otp: otpInputRef.current.value,
      orderItems: cartData?.map((item) => {
        return { entityId: item.entityId };
      }),
    };
    try {
      const response = await placeOrderService(newData);
      if (response?.data) {
        const message = response?.data?.data?.message;
        setLoading(false);
        toast.success(message);
        dispatch(setCurrentIndex(4));
        dispatch(setTermsChecked(false));
        dispatch(emptyCart());
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
        dispatch(setCurrentIndex(2));
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

  useEffect(() => {
    if (cartData?.length === 0) {
      dispatch(setOpenCheckout(false));
      dispatch(setCurrentIndex(0));
    }
  }, [cartData]);

  return (
    <Theme
      theme={theme.bgTheme}
      as={ComposedModal}
      open={openCheckout}
      onClose={() => {
        dispatch(setOpenCheckout(false));
        if (currentIndex === 4) {
          dispatch(emptyCart());
          dispatch(setCurrentIndex(0));
          dispatch(setOpenCheckout(false));
        }
      }}
      className="checkoutModal"
      size="lg"
    >
      {loading && <Loading />}
      <ModalHeader
        title={currentIndex < 4 ? "Checkout" : "Thank you for your order!"}
      />
      <ModalBody>
        <Stack gap={6}>
          <Row className="py-1">
            <Column lg={16} md={8} sm={4}>
              <ProgressIndicator currentIndex={currentIndex} spaceEqually>
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
                {currentIndex === 0 && "Review Your Cart"}
                {currentIndex === 1 && "Enter Your Shipping Information"}
                {currentIndex === 2 &&
                  "Uvation Rewards Terms of Services Agreement"}
                {currentIndex === 3 && "Confirm Your Order"}
                {currentIndex === 4 && "Your Order"}
              </div>
            </Column>
          </Row>

          <Row>
            <Column lg={16} md={8} sm={4}>
              {currentIndex === 0 && (
                <>
                  {cartData?.map((item) => (
                    <PurchaseCard
                      trashCan={true}
                      productDetails={item}
                      key={item.id}
                    />
                  ))}
                </>
              )}
              {currentIndex === 1 && <CheckoutForm formik={formik} />}
              {currentIndex === 2 && <Terms theme={theme.bgTheme} />}
              {currentIndex === 3 && (
                <ConfirmOrder address={address} otpInput={otpInputRef} />
              )}
              {currentIndex === 4 && <ConfirmOrderDetails address={address} />}
            </Column>
          </Row>
        </Stack>
      </ModalBody>

      <ModalFooter>
        {!(currentIndex == 0 || currentIndex == 4) && (
          <Button
            kind="secondary"
            onClick={() => {
              if (currentIndex > 0) {
                dispatch(setCurrentIndex(currentIndex - 1));
              }
            }}
          >
            Back
          </Button>
        )}
        <Button
          kind="primary"
          onClick={() => {
            if (currentIndex === 0) dispatch(setCurrentIndex(1));
            else if (currentIndex === 1) {
              validateAddress(formik.values);
            } else if (currentIndex === 2 && termsChecked)
              dispatch(setCurrentIndex(3));
            else if (currentIndex === 3) {
              placeOrder();
            } else if (currentIndex === 4) {
              dispatch(setCurrentIndex(0));
              dispatch(emptyCart());
              dispatch(setOpenCheckout(false));
            } else {
              toast.error("Please fill all the fields");
            }
          }}
          disabled={currentIndex === 2 && !termsChecked}
        >
          {(currentIndex === 0 || currentIndex === 2) && "Next"}
          {currentIndex === 1 &&
            (validatingAddress ? (
              <InlineLoading
                status="active"
                iconDescription="Validating Address"
                description="Validating Address..."
              />
            ) : (
              "Next"
            ))}
          {currentIndex === 3 && " Confirm Your Order"}
          {currentIndex === 4 && "Close Checkout"}
        </Button>
      </ModalFooter>
    </Theme>
  );
};

export default CheckoutModal;
