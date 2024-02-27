import { ProgressBar } from "@carbon/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferralsList } from "../../redux/referals/referralsSlice";

export default function ReferralsProgress() {
  const dispatch = useDispatch();
  const successfulReferrals = useSelector(
    (state) => state.referrals?.referralsList?.successfulReferralsCount
  );
  localStorage.setItem("successfulReferrals", successfulReferrals);
  const sentReferrals = useSelector(
    (state) => state.referrals?.referralsList?.data?.totalCount
  );
  useEffect(() => {
    dispatch(getReferralsList({ limit: 5, skip: 0 }));
  }, []);
  return (
    <div>
      <ProgressBar
        label={`Successful Referrals ${successfulReferrals} of ${sentReferrals}`}
        helperText=""
        value={successfulReferrals}
        max={sentReferrals}
        size="big"
      />
    </div>
  );
}
