import { Link } from "react-router-dom";
import LoyaltyaltyPointsCard from "../loyaltyPointsCard/LoyaltyaltyPointsCard";
import "./halfwidget.scss";
import { Column, Heading, Row, Section, Theme, Tooltip } from "@carbon/react";
import { Help } from "@carbon/icons-react";
import { REWARDS_MARKET } from "../../constants/redirectUrls";
import { useSelector } from "react-redux";

export const HalfWidget1 = ({ user = "", credits = 0, loyaltyPoints = 0 }) => {
  const theme = useSelector((state) => state.theme);
  const tooltip =
    "Uvation customers earn points for every purchase they make using their account. Loyalty Points can be redeemed towards free items while USP Credits can be applied towards service/hosting invoices";
  return (
    <Theme theme={theme.contentTheme} className="half__widget box-shadow">
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
          <Heading className="fs-24 fw-400 text-center card-title">
            Welcome Back, <span className="fw-500">{user}</span>
          </Heading>
        </Section>
      </Column>

      {/* row-2 */}
      <Column lg={16}>
        <Row>
          <Column lg={8} md={4} sm={2}>
            <LoyaltyaltyPointsCard
              title="Loyalty Points"
              points={loyaltyPoints}
              description="Points Available"
              subtext1="Click here to redeem"
              to={REWARDS_MARKET}
              subtext2={null}
              font1="fs-24"
              font2="fs-20"
              font3="fs-16"
              font4="fs-12"
              ring={{
                maxValue: loyaltyPoints * 0.4 || 100,
                value: loyaltyPoints,
                maxColor: "rgba(14, 97, 254, 1)",
                valueColor: "rgba(36, 73, 143, 1)",
                height: "143px",
                width: "143px",
              }}
            />
          </Column>
          <Column lg={8} md={4} sm={2}>
            <LoyaltyaltyPointsCard
              title="USP Credits"
              points={credits}
              description="Credits Available"
              subtext1="Redeemable on the <br/> Uvation Services Platform"
              to={"http://portal.uvation.com"}
              font1="fs-24"
              font2="fs-20"
              font3="fs-16"
              font4="fs-12"
              ring={{
                maxValue: credits * 1.2 || 100,
                value: credits,
                maxColor: "rgba(151, 71, 255, 1)",
                valueColor: "rgba(77, 45, 119, 1)",
                height: "143px",
                width: "143px",
              }}
            />
          </Column>
        </Row>
      </Column>

      {/* row-3 */}
      <Column lg={16} md={8} sm={4} className="text-center fs-20 fw-500">
        Looking to earn more points?{" "}
        <Link to="/promotions" className="decoration-none hover-underline">
          View our Promotions
        </Link>
      </Column>
    </Theme>
  );
};
