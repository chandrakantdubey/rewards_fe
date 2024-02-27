import { ProgressBar } from "@carbon/react";
import "./loyaltyPointsProgress.scss";

export default function LoyaltyPointsProgress({ max, value }) {
  return (
      <ProgressBar
        label={`${value} / ${max} Loyalty Points Earned`}
        helperText=""
        value={value}
        max={max}
        size="big"
      />
  );
}
