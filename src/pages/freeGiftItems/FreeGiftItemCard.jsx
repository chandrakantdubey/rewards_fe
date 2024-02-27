import { View, Add } from "@carbon/icons-react";
import "./freeGiftItemCard.scss";
import { Button, Tag, Theme } from "@carbon/react";
import { formatNumberToAmericanStandard } from "../../utils/formatUtils";
import { useDispatch, useSelector } from "react-redux";
import { toggleViewProductModal } from "../../redux/toggleSlice/toggleSlice";
import {
  setFreeGiftItem,
  setOpenGiftItemCheckout,
} from "../../redux/checkout/checkoutSlice";
import { useEffect, useState } from "react";
import moment from "moment";

const FreeGiftItemCard = ({ item, isFeaturedDiscount }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [formattedExpirationDate, setFormattedExpirationDate] = useState("");

  // useEffect(() => {
  //   const expirationDate = moment(item?.createdAt).add(
  //     item?.expirationDays,
  //     "days"
  //   );
  //   const formattedDate = expirationDate.format("MMM DD, YYYY");
  //   setFormattedExpirationDate(formattedDate);
  // }, [item?.expirationDays, item?.createdAt]);

  useEffect(() => {
    const currentDate = moment();
    const expirationDate = moment(item?.createdAt).add(
      item?.expirationDays,
      "days"
    );
    const remainingDays = expirationDate.diff(currentDate, "days");
    setFormattedExpirationDate(
      remainingDays > 0 ? `${remainingDays} days` : "Expired"
    );
  }, [item?.expirationDays, item?.createdAt]);

  // Check if the offer has expired
  const hasExpired = moment(item?.createdAt)
    .add(item?.expirationDays, "days")
    .isBefore(moment());

  const isRedeemed = item?.redeemed;

  return (
    <Theme theme={theme.contentTheme}>
      <div
        className={`freeGiftItem ${hasExpired || isRedeemed ? "expired" : ""}`}
      >
        {(hasExpired || isRedeemed) && <div className="expiredOverlay"></div>}
        {isFeaturedDiscount && (
          <div
            style={{
              width: "100px",
              height: "100px",
              position: "absolute",
              left: "0px",
              top: "0px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 75 75"
              fill="none"
            >
              <path
                d="M75 -2.83914e-06L-3.27835e-06 75L0 1.2126e-06L75 -2.83914e-06Z"
                fill="#DA1E28"
              />
              <text
                x="50%"
                y="25%"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                transform="rotate(-45 37.5 37.5)"
              >
                {hasExpired
                  ? "Expired"
                  : isRedeemed
                  ? "Redeemed"
                  : "Expires in"}
              </text>
              <text
                x="50%"
                y="40%"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                transform="rotate(-45 37.5 37.5)"
              >
                {}
                {hasExpired
                  ? ""
                  : isRedeemed
                  ? item?.redeemedLoyaltyPoints
                    ? "Loyalty Points"
                    : item?.redeemedFreeItem
                    ? "Free Gift"
                    : ""
                  : formattedExpirationDate}
              </text>
            </svg>
          </div>
        )}
        <div className="freeGiftItem__content">
          <div className="freeGiftItem__content__img">
            <img
              src={`https://marketplace.uvation.com/media/catalog/product${item?.details?.media_gallery_entries?.[0]?.file}`}
              alt={item?.productName}
            />
          </div>
          <div className="freeGiftItem__content__title">
            {item?.productName}
          </div>
          <div className="freeGiftItem__content__available">
            <Tag
              className="some-class"
              type="high-contrast"
              title="Clear Filter"
            >
              {"OR"}
            </Tag>
          </div>
          <div className="freeGiftItem__content__discount">
            Avail{" "}
            <strong style={{ color: "#2570FE", fontWeight: "500" }}>
              {formatNumberToAmericanStandard(item?.optionalLoyaltyPoints)}{" "}
            </strong>
            Loyalty Points
          </div>
        </div>
        <div className="freeGiftItem__buttons">
          <Button
            kind="secondary"
            renderIcon={Add}
            style={{
              minWidth: "50%",
            }}
            disabled={hasExpired || isRedeemed}
            onClick={() => {
              dispatch(setOpenGiftItemCheckout(true));
              dispatch(
                setFreeGiftItem({
                  title: item?.details?.sku,
                  loyaltyPoints: item?.loyaltyCardPoints,
                  price: item?.details?.price,
                  src: `https://marketplace.uvation.com/media/catalog/product${item?.details?.media_gallery_entries?.[0]?.file}`,
                  entityId: item?.entityId,
                  id: item?.id,
                  qty: 1,
                  expirationDays: item?.expirationDays,
                  createdAt: item?.createdAt,
                  optionalLoyaltyPoints: item?.optionalLoyaltyPoints,
                })
              );
            }}
          >
            Redeem
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

export default FreeGiftItemCard;
