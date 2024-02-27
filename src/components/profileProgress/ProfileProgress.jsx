import { ProgressBar } from "@carbon/react";
import { useSelector } from "react-redux";

export default function ProfileProgress() {
  const completionPercentage = useSelector(
    (state) => state.salesForce.userInfoData?.profileCompletion
  );
  const formattedPercentage = completionPercentage
    ? completionPercentage.toFixed(2)
    : 0;
  return (
    <div>
      <ProgressBar
        label={`Profile Completion ${Number(formattedPercentage)}%`}
        helperText=""
        value={Number(formattedPercentage) || 0}
        max={100}
        size="big"
      />
    </div>
  );
}
