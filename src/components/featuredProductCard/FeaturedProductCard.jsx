import { View, Plus } from "@carbon/icons-react";
import "./featuredProductCard.css";
import { formatNumberToAmericanStandard } from "../../utils/formatUtils";
import { Button } from "@carbon/react";
const FeaturedProductCard = ({
  title = "Apple 16” MacBook Pro",
  oldPoints = "249900",
  newPoints = "199900",
  price = "500",
  src = "/promotions/promotionsmac.jpg",
}) => {
  return (
    <div className="featured__productcard">
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
      <div className="featured__productcard__content">
        <div className="featured__productcard__content__img">
          <img src={src} alt={title} />
        </div>
        <div className="featured__productcard__content__title">{title}</div>
        <div className="featured__productcard__content__price">
          Was <del>${formatNumberToAmericanStandard(oldPoints)}</del>, Now{" "}
          {formatNumberToAmericanStandard(newPoints)}
        </div>
        <div className="featured__productcard__content__discount">
          <del>${formatNumberToAmericanStandard(price)}</del> Free
        </div>
      </div>
      <div className="featured__productcard__buttons">
        <Button kind="secondary" renderIcon={Plus} style={{ minWidth: "50%" }}>
          Add to cart
        </Button>
        <Button kind="secondary" renderIcon={View} style={{ minWidth: "50%" }}>
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
