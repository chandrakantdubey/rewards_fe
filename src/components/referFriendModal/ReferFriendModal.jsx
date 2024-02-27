import {
  Button,
  Column,
  ComposedModal,
  Loading,
  ModalBody,
  ModalHeader,
  Row,
  Stack,
  TextArea,
  TextInput,
  Theme,
} from "@carbon/react";
import "./referFriendModal.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendReferralRequest } from "../../services/referralService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { toggleReferralModal } from "../../redux/toggleSlice/toggleSlice";
import { useState } from "react";

const ReferFriendModal = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [loading, setIsLoading] = useState(false);

  const openReferral = useSelector((state) => state.toggle.referralModal);
  function closeModal(resetForm) {
    dispatch(toggleReferralModal());
    if (resetForm) {
      resetForm();
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      message: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      const formData = {
        email: values.email,
        message: values.message,
      };
      const response = await sendReferralRequest(formData);
      setIsLoading(false);

      if (!response.error) {
        toast.success(response?.data?.data?.message);
      } else {
        const code = response.error?.data?.code;
        toast.error(
          code === "ALREADY_CUSTOMER" || code === "EMAIL_SENT_ERROR"
            ? response.error?.data?.message
            : "Something went wrong!"
        );
      }
      closeModal(resetForm);
    },
  });
  return (
    <Theme
      theme={theme.bgTheme}
      as={ComposedModal}
      open={openReferral}
      onClose={closeModal}
      className="referFriendModal"
      size="md"
    >
      {loading && <Loading active />}
      <ModalHeader title="Refer a Friend to Uvation" />
      <ModalBody>
        <form onSubmit={formik.handleSubmit}>
          <Stack gap={7}>
            <Row>
              <Column lg={8} md={4} sm={4}>
                <TextInput
                  type="text"
                  labelText="First Name"
                  id="firstName"
                  name="firstName"
                  placeholder="First"
                  required
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.errors.firstName}
                  invalidText={formik.errors.firstName}
                />
              </Column>
              <Column lg={8} md={4} sm={4}>
                <TextInput
                  type="text"
                  labelText="Last Name"
                  id="lastName"
                  name="lastName"
                  placeholder="Last"
                  required
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.errors.lastName}
                  invalidText={formik.errors.lastName}
                />
              </Column>
            </Row>
            <Row>
              <Column lg={16} md={8} sm={4}>
                <TextInput
                  type="email"
                  labelText="Email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.errors.email}
                  invalidText={formik.errors.email}
                />
              </Column>
            </Row>
            <Row>
              <Column lg={16} md={8} sm={4}>
                <TextArea
                  labelText="Add a message"
                  rows={6}
                  enableCounter
                  id="message"
                  name="message"
                  maxCount={100}
                  placeholder={`Hey!\n\nYou should consider checking out Uvation for your IT needs. By creating an account with them, we will both receive 100 loyalty points that we can spend on their marketplace! Uvation provides critical technology services to groundbreaking private and public organizations.\n\nYou can create an account here!\nhttps://uvation.com/`}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  warn={formik.errors.message}
                  warnText={formik.errors.message}
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <Button kind="primary" type="submit" disabled={!formik.isValid}>
                  Submit
                </Button>
              </Column>
            </Row>
          </Stack>
        </form>
      </ModalBody>
    </Theme>
  );
};

export default ReferFriendModal;
