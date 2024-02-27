import { Button, HeaderPanel, Loading, Theme } from "@carbon/react";
import { PurchaseCard } from "../purchaseCard/PurchaseCard";
import "./cart.scss";
import { ShoppingBag } from "@carbon/icons-react";
import CheckoutModal from "../checkoutModal/CheckoutModal";
import { useDispatch, useSelector } from "react-redux";
import { setOpenCheckout } from "../../redux/checkout/checkoutSlice";
import { toast } from "react-toastify";
import { formatNumberToAmericanStandard } from "../../utils/formatUtils";
import { toggleCart } from "../../redux/toggleSlice/toggleSlice";
import { useState } from "react";
import { emptyCart } from "../../redux/cart/cartSlice";
import rewardsApi from "../../api/rewardsApi";
import { FREE_CARDS_REDEEM } from "../../constants/apiEndpoints";

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const isGiftCard = useSelector((state) => state.cart.isGiftCard);
  const loyaltyPoints = useSelector(
    (state) => state.loyaltyPoints.loyaltyPoints?.data?.loyaltyPointsBalance
  );
  const cartToggle = useSelector((state) => state.toggle.cart);
  const theme = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);

  const redeemGiftCard = async () => {
    setLoading(true);
    const data = {
      brands: cartData?.cartData?.data?.map((brand) => brand.id),
      loyaltyPointsUsed: cartData?.totalLoyaltyPoints,
      actualAmountInCents: cartData?.actualAmountInCents,
    };
    try {
      const response = await rewardsApi.post(FREE_CARDS_REDEEM, data);
      if (response?.data) {
        toast.success(response?.data?.message);
        dispatch(emptyCart());
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(toggleCart());
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (itemAlreadyInCart) {
  //     toast.error("Item already exists in cart");
  //   }
  //   dispatch(resetItemAlreadyInCart());
  // }, [itemAlreadyInCart]);

  return (
    <>
      <HeaderPanel
        addFocusListeners={false}
        aria-label="User Cart"
        aria-labelledby="User Cart"
        expanded={cartToggle}
        className="header__panel"
      >
        <Theme theme={theme.contentTheme}>
          {loading && <Loading withOverlay />}
          <div className="close" onClick={() => dispatch(toggleCart())}></div>
          <div className="user__cart">
            <div className="user__cart__header">
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                Your Cart <ShoppingBag size={36} />
              </h2>
            </div>
            <div className="user__cart__main">
              {cartData?.totalItems > 0 ? (
                <>
                  {cartData?.cartData?.data?.map((item) => (
                    <PurchaseCard key={item?.id} productDetails={item} />
                  ))}
                </>
              ) : (
                <img src="/icons/cart.png" alt="cart" />
              )}
            </div>
            <div className="user__cart__footer fw-400">
              {cartData?.totalLoyaltyPoints > loyaltyPoints && (
                <p className="text-center">
                  *Insufficient Loyalty Points, Remove Items From Cart
                </p>
              )}
              <h4 className="fw-400 fs-14">
                Total :{" "}
                {formatNumberToAmericanStandard(cartData?.totalLoyaltyPoints)}{" "}
                {cartData?.totalLoyaltyPoints ? "Loyalty Points" : null}
              </h4>
              <Button
                kind="primary"
                style={{
                  minWidth: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingRight: "15px",
                }}
                onClick={() => {
                  if (isGiftCard) {
                    redeemGiftCard();
                  } else {
                    if (cartData?.totalItems > 0) {
                      dispatch(setOpenCheckout(true));
                    } else {
                      toast.error("Cart is empty! Add items to cart");
                    }
                  }
                  dispatch(toggleCart());
                }}
                disabled={cartData?.totalLoyaltyPoints > loyaltyPoints}
              >
                Checkout
              </Button>
            </div>
          </div>
        </Theme>
      </HeaderPanel>
      <CheckoutModal />
    </>
  );
};

export default Cart;
