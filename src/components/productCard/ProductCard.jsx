import { View, Add } from "@carbon/icons-react";
import "./productcard.scss";
import { Button, Theme } from "@carbon/react";
import {
  formatNumberToAmericanStandard,
  formatNumberToAmericanStandardDec,
} from "../../utils/formatUtils";
import { addToCart } from "../../redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleViewProductModal } from "../../redux/toggleSlice/toggleSlice";

const ProductCard = ({ item, isFeaturedDiscount }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  return (
    <Theme theme={theme.contentTheme}>
      <div className="productcard">
        {isFeaturedDiscount && (
          <div
            style={{
              width: "75px",
              height: "75px",
              position: "absolute",
              left: "0px",
              top: "0px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              viewBox="0 0 75 75"
              fill="none"
            >
              <path
                d="M75 -2.83914e-06L-3.27835e-06 75L0 1.2126e-06L75 -2.83914e-06Z"
                fill="#DA1E28"
              />
            </svg>
          </div>
        )}
        <div className="productcard__content">
          <div className="productcard__content__img">
            <img
              src={`https://marketplace.uvation.com/media/catalog/product${item?.details?.media_gallery_entries?.[0]?.file}`}
              alt={item?.productName}
            />
          </div>
          <div className="productcard__content__title">{item?.productName}</div>
          <div className="productcard__content__available">
            <span>
              {item?.preDiscountLoyaltyCardPoints > 0
                ? "Was"
                : "Available from"}{" "}
            </span>
            <span>
              {item?.preDiscountLoyaltyCardPoints > 0 && (
                <del>{item?.preDiscountLoyaltyCardPoints}</del>
              )}{" "}
            </span>
            <span>{item?.preDiscountLoyaltyCardPoints > 0 && "Now"} </span>
            <strong style={{ color: "#2570FE" }}>
              {formatNumberToAmericanStandard(item?.loyaltyCardPoints)}
            </strong>{" "}
            <span>
              {item?.preDiscountLoyaltyCardPoints > 0 ? null : "Loyalty Points"}{" "}
            </span>
          </div>
          <div className="productcard__content__discount">
            <del>
              ${formatNumberToAmericanStandardDec(item?.details?.price)}
            </del>{" "}
            <span style={{ color: "#42BE65" }}>Free</span>
          </div>
        </div>
        <div className="productcard__buttons">
          <Button
            kind="secondary"
            renderIcon={Add}
            style={{
              minWidth: "50%",
            }}
            onClick={() => {
              dispatch(
                addToCart({
                  title: item?.details?.sku,
                  loyaltyPoints: item?.loyaltyCardPoints,
                  price: item?.details?.price,
                  src: `https://marketplace.uvation.com/media/catalog/product${item?.details?.media_gallery_entries?.[0]?.file}`,
                  entityId: item?.entityId,
                  id: item?.id,
                  qty: 1,
                })
              );
            }}
          >
            Add to cart
          </Button>
          <Button
            kind="primary"
            renderIcon={View}
            style={{
              minWidth: "50%",
            }}
            onClick={() => dispatch(toggleViewProductModal(item))}
          >
            View Product
          </Button>
        </div>
      </div>
    </Theme>
  );
};

export default ProductCard;
