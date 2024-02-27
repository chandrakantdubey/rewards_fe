import { Stack } from "@carbon/react";

function ConfirmOrderDetails({ address }) {
  return (
    <Stack gap={6}>
      <p>Shipping Address</p>
      <div>
        <p>{address?.firstName + " " + address?.lastName}</p>
        <p>{address?.street}</p>
        <p>
          {`${address?.city || null}, ${address?.state || null} ${
            address?.postCode || null
          }`}
        </p>
      </div>
      <p>Details:</p>
      <p>
        Order placed on{" "}
        {new Date().toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
      <p>Current Status : Under Review</p>
      <p>Check your email for updates on your purchase.</p>
    </Stack>
  );
}

export default ConfirmOrderDetails;
