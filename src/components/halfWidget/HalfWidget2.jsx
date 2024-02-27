import { Link } from "react-router-dom";
import { formatNumberToAmericanStandard } from "../../utils/formatUtils";
import RewardCard from "../rewardCard/RewardCard";
import "./halfwidget.scss";
import { Column, Heading, Row, Section, Tooltip } from "@carbon/react";
import { Help } from "@carbon/icons-react";
import { REWARDS_TIER_BENEFITS } from "../../constants/redirectUrls";
import LoyaltyPointsProgress from "../loyaltyPointsProgress/LoyaltyPointsProgress";
import { useSelector } from "react-redux";

export const HalfWidget2 = ({ user = "", cardNum, membership }) => {
  const theme = useSelector((state) => state.theme);

  const tooltip =
    "Our Rewards Members can climb Uvation tiers by earning Loyalty Points through purchase or promotions. Higher tiers gain access to improved savings and better discounts";
  return (
    <div className="half__widget box-shadow">
      <div className="tooltip__right">
        <Tooltip
          label={tooltip}
          align="top-right"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <button className="sb-tooltip-trigger" type="button">
            <Help className={`${theme?.bgTheme === "g100" && "fillWhite"}`} />
          </button>
        </Tooltip>
      </div>

      {/* row-1 */}
      <Column lg={16}>
        <Section>
          <Heading className="text-center fs-24 fw-500">
            Your Uvation Rewards
          </Heading>
        </Section>
      </Column>

      {/* row-2 */}
      <Column lg={16} className="reward__card__container">
        <RewardCard
          user={user}
          cardNum={cardNum}
          img={membership?.currentMembershipTier?.url || ""}
        />
      </Column>

      {/* row-3 */}
      <Column lg={16} className="text-center ">
        <div className="progress__bar mb-1 fs-16">
          <div className="fw-500">
            {membership?.currentMembershipTier?.name || ""}
          </div>
          <LoyaltyPointsProgress
            max={membership?.nextMembershipTier?.points || 0}
            value={membership?.currentYearLoyaltyPointsEarning || 0}
          />
          <div className="fw-500">
            {membership?.nextMembershipTier?.name || ""}
          </div>
        </div>
        <Link
          to={REWARDS_TIER_BENEFITS}
          target="_blank"
          className="fs-12 fw-400 color-secondary decoration-none hover-underline"
        >
          See Uvation Rewards Tier Benefits
        </Link>
      </Column>
    </div>
  );
};
