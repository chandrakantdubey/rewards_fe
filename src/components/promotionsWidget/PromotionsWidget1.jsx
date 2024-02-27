import LoyaltyaltyPointsCard from "../loyaltyPointsCard/LoyaltyaltyPointsCard";
import "./promotionsWidget.scss";
import { Column, Heading, Row, Section, Theme, Tooltip } from "@carbon/react";
import { Help } from "@carbon/icons-react";
import { useSelector } from "react-redux";

function PromotionsWidget1({ user, membership, credits, loyaltyPoints }) {
  const tooltip =
    "Uvation customers earn points for every purchase they make using their account. Loyalty Points can be redeemed towards free items while USP Credits can be applied towards service/hosting invoices";
  const theme = useSelector((state) => state.theme);

  return (
    <Theme
      theme={theme.contentTheme}
      as={Row}
      className="promotions__widget box-shadow"
    >
      <div className="tooltip__right">
        <Tooltip
          label={tooltip}
          align="bottom-right"
          enterDelayMs={0}
          leaveDelayMs={300}
        >
          <button className="sb-tooltip-trigger" type="button">
            <Help className={`${theme?.bgTheme === "g100" && "fillWhite"}`} />
          </button>
        </Tooltip>
      </div>

      {/* row-1 */}
      <Column lg={16} className="mb-05">
        <Section>
          <Heading className="fs-24 fw-500 text-center">
            {user || "User"} {"'s "} Account
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
              gap="8px"
              font1="fs-16"
              font2="fs-16"
              font3="fs-16"
              pmb=" "
              tmb="mb-05"
              pcmb=" "
              ring={{
                maxValue: loyaltyPoints * 0.4 || 100,
                value: loyaltyPoints,
                maxColor: "rgba(14, 97, 254, 1)",
                valueColor: "rgba(36, 73, 143, 1)",
                width: "70px",
                height: "70px",
              }}
            />
          </Column>
          <Column lg={8} md={4} sm={2}>
            <LoyaltyaltyPointsCard
              title="USP Credits"
              points={credits}
              description="Credits Available"
              gap="8px"
              font1="fs-16"
              font2="fs-16"
              font3="fs-16"
              pmb=" "
              tmb="mb-05"
              pcmb=" "
              ring={{
                maxValue: credits * 1.2 || 1000,
                value: credits,
                maxColor: "rgba(151, 71, 255, 1)",
                valueColor: "rgba(77, 45, 119, 1)",
                width: "70px",
                height: "70px",
              }}
            />
          </Column>
        </Row>
      </Column>
    </Theme>
  );
}

export default PromotionsWidget1;
