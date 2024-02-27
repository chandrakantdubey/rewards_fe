import { ProgressIndicator, ProgressStep } from "@carbon/react";
import "./progressbar.css";

export const ProgressBar = () => {
  return (
    <div className="progressbar">
      <ProgressIndicator>
        <ProgressStep
          complete
          label="First step"
          description="Step 1: Getting started with Carbon Design System"
          secondaryLabel="Optional label"
        />
        <ProgressStep
          current
          label="Second step with tooltip"
          description="Step 2: Getting started with Carbon Design System"
        />
        <ProgressStep
          label="Third step with tooltip"
          description="Step 3: Getting started with Carbon Design System"
        />
        <ProgressStep
          label="Fourth step"
          description="Step 4: Getting started with Carbon Design System"
          invalid
          secondaryLabel="Example invalid step"
        />
        <ProgressStep
          label="Fifth step"
          description="Step 5: Getting started with Carbon Design System"
          disabled
        />
      </ProgressIndicator>
    </div>
  );
};

export default ProgressIndicator;
