import {
  Button,
  ComposedModal,
  Loading,
  ModalBody,
  ModalHeader,
  ProgressIndicator,
  ProgressStep,
} from "@carbon/react";
import "./giftCardCeckoutModal.scss";
import { PurchaseCard } from "../purchaseCard/PurchaseCard";
import { useState } from "react";
import Terms from "../terms/Terms";
import CheckoutForm from "../checkoutForm/CheckoutForm";
import ConfirmOrder from "../confirmOrder/ConfirmOder";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../redux/cart/cartSlice";
import { placeOrderService } from "../../services/orderService";
import { toast } from "react-toastify";
import {
  setAddress,
  setIsAddressSet,
  setOpenCheckout,
  setTermsChecked,
} from "../../redux/checkout/checkoutSlice";

const CheckoutModal = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const cartData = useSelector((state) => state.cart.cartData.data);
  const userData = useSelector((state) => state.user.userData.data?.data);
  const isAddressSet = useSelector((state) => state.checkout.isAddressSet);
  const termsChecked = useSelector((state) => state.checkout.termsChecked);
  const openCheckout = useSelector((state) => state.checkout.openCheckout);
  const address = useSelector((state) => state.checkout.address);
  const [loading, setLoading] = useState(false);

  return (
    <ComposedModal
      open={openCheckout}
      onClose={() => dispatch(setOpenCheckout(false))}
      className="checkout"
    >
      {loading && <Loading />}
      <ModalHeader
        title={currentIndex < 4 ? "Checkout" : "Thank you for your order!"}
        style={{}}
      />
      <ModalBody>
        <div className="checkout__modal">
          <div className="checkout__modal__header">
            <ProgressIndicator currentIndex={currentIndex} spaceEqually>
              <ProgressStep index={0} label="Review" />
              <ProgressStep index={1} label="Shipping" />
              <ProgressStep index={2} label="Terms" />
              <ProgressStep index={3} label="Confirm" />
            </ProgressIndicator>
            <h4 className="checkout__modal__header__title">
              {currentIndex === 0 && "Review Your Cart"}
              {currentIndex === 1 && "Enter Your Shipping Information"}
              {currentIndex === 2 &&
                "Uvation Rewards Terms of Services Agreement"}
              {currentIndex === 3 && "Confirm Your Order"}
              {currentIndex === 4 && "Your Order"}
            </h4>
          </div>
          <div className="checkout__modal__content">
            {currentIndex === 0 && (
              <>
                {cartData?.map((item) => (
                  <PurchaseCard
                    trashCan={false}
                    productDetails={item}
                    key={item.id}
                  />
                ))}
              </>
            )}
            {currentIndex === 1 && <CheckoutForm userData={userData} />}
            {currentIndex === 2 && <Terms />}
            {currentIndex === 3 && <ConfirmOrder address={address} />}
            {currentIndex === 4 && (
              <>
                <p>Shipping Address</p>
                <div className="confirm__order__address">
                  <p>{address?.firstName + " " + address?.lastName}</p>
                  <p>{address?.street}</p>
                  <p>
                    {`${address?.city || null}, ${address?.state || null} ${
                      address?.postCode || null
                    }`}
                  </p>
                </div>
                <br />
                <p>Details</p>
                <div className="confirm__order__details">
                  <p>
                    Order placed on{" "}
                    {new Date().toLocaleString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                  <p>Current Status : Under Review</p>
                  <p>Check your email for updates on your purchase.</p>
                </div>
              </>
            )}
          </div>
          <div className="checkout__modal__actions">
            {currentIndex < 4 && (
              <Button
                kind="secondary"
                onClick={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex((prev) => prev - 1);
                  }
                }}
              >
                Back
              </Button>
            )}
            {
              <>
                {currentIndex < 3 && (
                  <Button
                    kind="primary"
                    onClick={() => {
                      setCurrentIndex((prev) => prev + 1);
                    }}
                    disabled={
                      (currentIndex === 1 && !isAddressSet) ||
                      (currentIndex === 2 && !termsChecked)
                    }
                  >
                    Next
                  </Button>
                )}
                {currentIndex === 3 && (
                  <Button
                    kind="primary"
                    onClick={() => {
                      placeOrder();
                      setCurrentIndex((prev) => prev + 1);
                    }}
                  >
                    Confirm Your Order
                  </Button>
                )}
                {currentIndex === 4 && (
                  <Button
                    kind="primary"
                    onClick={() => {
                      setCurrentIndex(0);
                      dispatch(setOpenCheckout(false));
                    }}
                  >
                    Close Checkout
                  </Button>
                )}
              </>
            }
          </div>
        </div>
      </ModalBody>
    </ComposedModal>
  );
};

export default CheckoutModal;
