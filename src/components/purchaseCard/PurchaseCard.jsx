import { formatNumberToAmericanStandard } from "../../utils/formatUtils";
import { TrashCan } from "@carbon/icons-react";
import "./purchasecard.scss";
import { removeFromCart, removeGiftCard } from "../../redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export const PurchaseCard = ({ productDetails, trashCan = true }) => {
  const dispatch = useDispatch();
  const isGiftCard = useSelector((state) => state.cart.isGiftCard);
  return (
    <div className={"purchasecard"}>
      <div className="purchasecard__img">
        <img src={productDetails.src} />
        {productDetails?.qty && (
          <div className="purchasecard__qty">{productDetails?.qty}</div>
        )}
      </div>
      <div className="purchasecard__text">
        <div className="purchasecard__text__title">{productDetails?.title}</div>
        <div className="purchasecard__text-description">
          {productDetails?.description}
        </div>
        <div className="purchasecard___text__loyalty">
          {formatNumberToAmericanStandard(productDetails?.loyaltyPoints)}{" "}
          Loyalty Points
        </div>
      </div>
      {trashCan && (
        <div
          className="purchasecard__delete"
          onClick={() =>
            isGiftCard
              ? dispatch(removeGiftCard({ id: productDetails?.id }))
              : dispatch(removeFromCart({ id: productDetails?.id }))
          }
        >
          <TrashCan size={32} />
        </div>
      )}
    </div>
  );
};
