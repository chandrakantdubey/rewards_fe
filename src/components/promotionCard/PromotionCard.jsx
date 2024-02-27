import { Button, Theme } from "@carbon/react";
import "./promotioncard.scss";
import { useDispatch, useSelector } from "react-redux";
function PromotionCard({
  title,
  text1,
  text2,
  btnTxt,
  btnIcon,
  handleClick,
  customComponet,
  dispatchFunction,
  email,
  newsLetterStatus,
  profileCompletion,
}) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  return (
    <Theme theme={theme.bgTheme} className="swiper__slide">
      <div className="promotion__card__top">
        <div style={{ fontSize: "24px", fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: "14px", fontWeight: 300 }}>
          <span>{text1} </span>
          <span style={{ color: "#2570FE", fontWeight: 500 }}>{text2}</span>
        </div>
      </div>
      <div className="promotion__card__bottom">
        <div className="promotion__card__bottom__progress">
          {customComponet}
        </div>
        <div className="promotion__card__bottom__btn">
          <Button
            renderIcon={btnIcon}
            kind="primary"
            style={{ minWidth: "100%" }}
            onClick={() =>
              dispatchFunction
                ? dispatch(dispatchFunction(email))
                : handleClick()
            }
            disabled={
              (newsLetterStatus !== undefined && newsLetterStatus) ||
              (profileCompletion !== undefined && profileCompletion)
            }
          >
            {btnTxt}
          </Button>
        </div>
      </div>
    </Theme>
  );
}

export default PromotionCard;
