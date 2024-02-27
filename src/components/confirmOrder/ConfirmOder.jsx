import { useDispatch, useSelector } from "react-redux";
import { PurchaseCard } from "../purchaseCard/PurchaseCard";
import { Button, Column, Row, Stack, TextInput } from "@carbon/react";
import { useEffect, useState } from "react";
import rewardsApi from "../../api/rewardsApi";
import { toast } from "react-toastify";
import { MobileCheck } from "@carbon/icons-react";
import { setOtp } from "../../redux/checkout/checkoutSlice";
import useDebounceEffect from "../../hooks/useDebounceEffect";

function ConfirmOrder({ address, otpInput }) {
  const cartData = useSelector((state) => state.cart.cartData.data);
  const dispatch = useDispatch();

  // for otp verification
  const [verificationRequested, setVerificationRequested] = useState(false);
  // const [otpInput, setOtpInput] = useState("");
  const [timer, setTimer] = useState(0);
  const getOtp = async () => {
    try {
      const res = await rewardsApi.post("/customer/send-otp");
      if (res.status === 200) {
        setVerificationRequested(true);
        setTimer(60);
        toast.success("OTP sent to your registered number.");
        setVerificationRequested(true);
      }
    } catch (error) {
      console.log("Error sending SMS:", error);
    }
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };

  // useDebounceEffect(
  //   () => {
  //     dispatch(setOtp(otpInput));
  //   },
  //   1500,
  //   [otpInput]
  // );

  useEffect(() => {
    let timerId;

    if (verificationRequested && timer > 0) {
      timerId = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [verificationRequested, timer]);

  return (
    <Stack gap={6}>
      <p>Your Cart</p>
      {cartData?.map((item) => (
        <PurchaseCard trashCan={false} productDetails={item} key={item.id} />
      ))}
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
      <p className="mb-1">Estimated Processing Time: 3-5 Business Days</p>

      <p className="mb-1">Multi-Factor Authentication</p>
      {verificationRequested ? (
        <>
          <Column sm={4} md={4} lg={4} xlg={4}>
            <TextInput.PasswordInput
              style={{
                height: "48px",
                border: "none",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
              placeholder="Enter OTP"
              // value={otpInput}
              ref={otpInput}
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   setOtpInput(e.target.value);
              // }}
            />
          </Column>
          <Column>
            <Button
              onClick={getOtp}
              disabled={timer > 0}
              style={{
                height: "48px",
              }}
            >
              Request new OTP {timer > 0 && "in : "}
              {timer > 0 && formatTime(timer)}
            </Button>
          </Column>
        </>
      ) : (
        <Button onClick={getOtp} renderIcon={MobileCheck}>
          Verify via SMS
        </Button>
      )}
    </Stack>
  );
}

export default ConfirmOrder;
