import { formatNumberToAmericanStandard } from "../../utils/formatUtils";
import "./promotionsWidget.scss";
import PromotionsRewardCard from "../promotionsRewardCard/PromotionsRewardCard";
import { Column, Heading, Row, Section, Theme } from "@carbon/react";
import LoyaltyPointsProgress from "../loyaltyPointsProgress/LoyaltyPointsProgress";
import { useSelector } from "react-redux";

function PromotionsWidget2({ user, cardNum, membership }) {
  const theme = useSelector((state) => state.theme);

  return (
    <Theme
      theme={theme.contentTheme}
      as={Row}
      className="promotions__widget box-shadow"
    >
      {/* row-1 */}
      <Column lg={16} className="mb-1">
        <Section>
          <Heading className="text-center fs-24 fw-500">
            Your Uvation Rewards
          </Heading>
        </Section>
      </Column>

      <Column className="promotions__widget__bottom" lg={16}>
        <div className="promotions__widget__current">
          <PromotionsRewardCard
            user={user}
            cardNum={cardNum}
            img={membership?.currentMembershipTier?.url}
            className="scaled__down"
          />
          <div className="fw-500">
            {membership?.currentMembershipTier?.name}
          </div>
        </div>

        <div className="promotions__widget__progress">
          <div className="promotions__widget__progress__bar">
            <LoyaltyPointsProgress
              max={membership?.nextMembershipTier?.points}
              value={membership?.currentYearLoyaltyPointsEarning}
            />
          </div>
          <div className="text-center fs-12 text-underline text-secondary">
            Complete Tasks Below and Earn Additional Points
          </div>
        </div>

        <div className="promotions__widget__next">
          <div className="promotions__widget__next__overlay__container">
            <span className="promotions__widget__next__overlay">?</span>
            <PromotionsRewardCard
              user={user}
              cardNum={cardNum}
              img={membership?.nextMembershipTier?.url}
              className="scaled__down"
            />
          </div>
          <div className="fw-500">{membership?.nextMembershipTier?.name}</div>
        </div>
      </Column>
    </Theme>
  );
}

export default PromotionsWidget2;
