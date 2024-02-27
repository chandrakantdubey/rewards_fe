import { Checkbox, Stack, TextArea } from "@carbon/react";
import { useDispatch, useSelector } from "react-redux";
import { setTermsChecked } from "../../redux/checkout/checkoutSlice";
function Terms({ theme }) {
  const termsChecked = useSelector((state) => state.checkout.termsChecked);
  const dispatch = useDispatch();
  const termsConditions = useSelector(
    (state) => state.subscribeToNewsletter.terms
  );

  const termsDescHTML = termsConditions?.data?.term_desc;
  const sanitizedHTML = termsDescHTML
    .replace(/<strong>/g, "")
    .replace(/<\/strong>/g, "")
    .replace(/<a\b[^>]*>(.*?)<\/a>/g, "")
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "")
    .replace(/&nbsp;/g, " ");

  return (
    <Stack gap={7}>
      <TextArea
        labelText="Terms of Service"
        rows={15}
        style={{
          border: `4px solid ${theme === "dark" ? "#ffffff" : "#000000"}`,
          outline: "none",
        }}
        value={sanitizedHTML}
      ></TextArea>
      <Checkbox
        labelText={`I agree to the Uvation Rewards Terms of Services Agreement`}
        id="terms"
        checked={termsChecked}
        onChange={(e) => {
          dispatch(setTermsChecked(e.target.checked));
        }}
      />
    </Stack>
  );
}

export default Terms;
