import { Column, Row, Heading, Section } from "@carbon/react";
import DataTableComp from "../../components/dataTable/DataTableComp";
import { getDonationsList } from "../../redux/charity/charitySlice";
import { getLoyaltyPointsList } from "../../redux/loyaltyPoints/loyaltyPointsSlice";
import { getReferralsList } from "../../redux/referals/referralsSlice";
import { getCreditsList } from "../../redux/credits/creditsSlice";
import {
  getGiftRedemptionList,
  getRedemptionList,
} from "../../redux/redemptions/redemptionSlice";
import ListPromotions from "../../components/customerPromotions/ListPromotions";
import USPPromotions from "../../components/customerPromotions/USPPromotions";

const History = () => {
  return (
    <>
      <Row className="mb-2">
        <Column lg={16}>
          <Section>
            <Heading className="heading-5">Rewards History</Heading>
          </Section>
        </Column>
      </Row>

      <Row className="mb-2">
        <Column lg={16}>
          <ListPromotions title="" description="" />
        </Column>
      </Row>

      <Row className="mb-2">
        <Column lg={16}>
          <USPPromotions title="" description="" />
        </Column>
      </Row>

      <Row className="mb-2">
        <Column lg={16}>
          <DataTableComp
            dispatchFunction={getLoyaltyPointsList}
            stateName1="loyaltyPoints"
            stateName2="loyaltyPointsList"
            title={"Loyalty Points"}
            description={"Loyalty Points earned by the user"}
          />
        </Column>
      </Row>

      <Row className="mb-2">
        <Column lg={16}>
          <DataTableComp
            dispatchFunction={getDonationsList}
            stateName1="charity"
            stateName2="donationsList"
            title={"Donations"}
            description={"Donations made by the user"}
          />
        </Column>
      </Row>

      <Row className="mb-2">
        <Column lg={16}>
          <DataTableComp
            dispatchFunction={getReferralsList}
            stateName1="referrals"
            stateName2="referralsList"
            title={"Referrals"}
            description={"Referrals made by the user"}
          />
        </Column>
      </Row>

      <Row className="mb-2">
        <Column lg={16}>
          <DataTableComp
            dispatchFunction={getCreditsList}
            stateName1="credits"
            stateName2="creditsList"
            title={"USP Credits"}
            description={"Credits earned by the user"}
          />
        </Column>
      </Row>

      <Row className="mb-2">
        <Column lg={16}>
          <DataTableComp
            dispatchFunction={getRedemptionList}
            stateName1="redemptions"
            stateName2="redemptionList"
            title={"Redemptions"}
            description={"Redemptions made by the user"}
          />
        </Column>
      </Row>

      <Row className="mb-2">
        <Column lg={16}>
          <DataTableComp
            dispatchFunction={getGiftRedemptionList}
            stateName1="redemptions"
            stateName2="giftRedemptionList"
            title={"Giftcard Redemptions"}
            description={"Giftcard Redemptions made by the user"}
          />
        </Column>
      </Row>
    </>
  );
};

export default History;
