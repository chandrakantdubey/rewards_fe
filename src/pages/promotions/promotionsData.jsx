import { Share, Add, ArrowRight, View } from "@carbon/icons-react";
import ReferralsProgress from "../../components/referralsProgress/ReferralsProgress";
import ProfileProgress from "../../components/profileProgress/ProfileProgress";
import { toggleReferralModal } from "../../redux/toggleSlice/toggleSlice";
import {
  PURCHASE_NEW_HARDWARE,
  SUBSCRIBE_NEW_SERVICE,
  UVATION_IDENTITY_ACCOUNT,
} from "../../constants/redirectUrls";
import { visitSite } from "../../utils/navigateUtils";
import { getSubscribeToNewsletter } from "../../redux/subscribeToNewsletter/subscribeToNewsletterSlice";

export const promotionsData = [
  {
    id: 1,
    title: "Refer a Friend to Uvation",
    text1:
      "For each person who creates an account using your referral, you’ll receive ",
    text2: "1000 Loyalty Points!",
    subtext: "Successful Referrals 1 out of 4",
    btnTxt: "Refer a Friend",
    btnIcon: Share,
    customComponet: <ReferralsProgress />,
    dispatchFunction: toggleReferralModal,
  },
  {
    id: 2,
    title: "Complete Account Details",
    text1: "Complete your profile details and receive",
    text2: "1,000 Loyalty Points.",
    subtext: "Profile Completion 25%",
    btnTxt: "Add Account Details",
    btnIcon: Add,
    customComponet: <ProfileProgress />,
    handleClick: () => visitSite(UVATION_IDENTITY_ACCOUNT),
  },
  {
    id: 3,
    title: "Purchase New Hardware",
    text1: "Uvation is always adding to our catalog of hardware products.",
    text2: "",
    subtext: "",
    btnTxt: "Take a Look",
    btnIcon: View,
    handleClick: () => visitSite(PURCHASE_NEW_HARDWARE),
  },
  {
    id: 4,
    title: "Subscribe to a New Service",
    text1: "Subscribe to a new USP service and receive",
    text2: "1,000 Loyalty Points.",
    subtext: "",
    btnTxt: "Look at Services",
    btnIcon: ArrowRight,
    handleClick: () => visitSite(SUBSCRIBE_NEW_SERVICE),
  },
  {
    id: 5,
    title: "Follow our Newsletter",
    text1: "Follow the Uvation Newsletter and receive",
    text2: "100 Loyalty Points each Month!",
    subtext: "",
    btnTxt: "Follow our Newsletter",
    btnIcon: ArrowRight,
    dispatchFunction: getSubscribeToNewsletter,
  },
];
