import {
  REWARDS_TIER_BENEFITS,
  UVATION_IDENTITY_MARKETPLACE,
} from "../../constants/redirectUrls";

export const thirdWidget = [
  {
    title: "Refer a Friend",
    text: "and receive </br> 100 Loyalty Points </br> and a Silver Tier Membership Each!",
    img: "https://cdn.uvation.com/uvationrewards/Assets/home/thirdwidget1.png",
    subtext: "See Referral Promotions",
    justifyContent: "flex-start",
    to: "/promotions",
    align : "left",
  },
  {
    title: "New Uvation Member Tiers",
    text: "for rewarding our </br> most loyal customers.",
    img: "https://cdn.uvation.com/uvationrewards/Assets/home/thirdwidget2.png",
    subtext: "Learn More",
    justifyContent: "flex-end",
    to: REWARDS_TIER_BENEFITS,
    centerImage: true,
    align : "right"
  },
  {
    title: "Our Products",
    text: "Uvation products allow customers to harness the full power of their IT infrastructure.",
    img: "https://cdn.uvation.com/uvationrewards/Assets/home/thirdwidget3.png",
    subtext: "See Our Products",
    justifyContent: "flex-end",
    to: UVATION_IDENTITY_MARKETPLACE,
    align : "right"

  },
];
