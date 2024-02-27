import { Column, Row } from "@carbon/react";
import "./rewardcard.scss";
const RewardCard = ({ user, cardNum, img }) => {
  const styles = {
    backgroundImage: `url("${img}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div style={styles} className="reward__card">
      <div className="reward__card__top">
        <h3 className="fs-20 fw-500">REWARDS</h3>
      </div>
      <div className="reward__card__center">
        <img src="/icons/uvation_logo.svg" alt="uvation" />
      </div>
      <div className="reward__card__bottom fs-12">
        <div>
          <div>{user}</div>
          <div>**** **** **** {cardNum}</div>
        </div>
        <div>
          <img src="/icons/uvation_mono_white.svg" alt="uvation" />
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
