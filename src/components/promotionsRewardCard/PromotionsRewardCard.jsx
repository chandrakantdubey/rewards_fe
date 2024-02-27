import "./promotionsRewardCard.scss";
const PromotionsRewardCard = ({ user, cardNum, img, className }) => {
  const styles = {
    backgroundImage: `url("${img}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "120px",
    height: "70px",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "500",
    boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.6)",
  };
  return (
    <div className="promotion__reward__card__container" style={styles}>
      <div className="promotion__reward__card">
        <div className="promotion__reward__card__title">REWARDS</div>
        <div className="promotion__reward__card__logo">
          <img
            src="/icons/uvation_logo.svg"
            alt="uvation"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="promotion__reward__card__bottom">
          <div className="promotion__reward__card__bottom__left">
            <span>{user}</span>
            <span>**** **** **** {cardNum}</span>
          </div>
          <div className="promotion__reward__card__bottom__right">
            <img
              src="/icons/uvation_mono_white.svg"
              alt="uvation"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsRewardCard;
