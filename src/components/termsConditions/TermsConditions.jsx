import { Modal } from "@carbon/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleReadTerms } from "../../redux/toggleSlice/toggleSlice";

export default function TermsConditions() {
  const dispatch = useDispatch();
  const terms = useSelector((state) => state.subscribeToNewsletter.terms);
  const readTerms = useSelector((state) => state.toggle.readTerms);
  return (
    <Modal
      open={readTerms}
      passiveModal
      modalHeading={terms?.data?.term_heading || `Terms & Conditions`}
      onRequestClose={() => dispatch(toggleReadTerms(false))}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: terms?.data?.term_desc.replace(/(<p>&nbsp;<\/p>){2}$/, ""),
        }}
        style={{ padding: "2rem 2rem 0 2rem" }}
      />
    </Modal>
  );
}
