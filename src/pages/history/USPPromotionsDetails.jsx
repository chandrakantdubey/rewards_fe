import { useEffect, useState } from "react";
import myPromotionsService from "../../redux/myPromotions/myPromotionsService";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Column,
  Form,
  FormGroup,
  Modal,
  Row,
  TextInput,
  Theme,
} from "@carbon/react";
import {} from "@carbon/icons-react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatDate } from "../../utils/formatUtils";
import { toast } from "react-toastify";
import { placePromotionFreeItemOrderService } from "../../services/orderService";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  street: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postcode: Yup.string()
    .required("Post Code is required")
    .min(3, "Postal Code is too short")
    .max(20, "Postal Code is too long")
    .matches(/^\d{3,20}$/, "Post Code must contain only numeric characters"),
  telephone: Yup.string()
    .required("Phone Number is required")
    .matches(/^\+?\d{5,15}$/, {
      message:
        "Phone Number must be between 5 and 15 digits and may start with a '+' sign",
      excludeEmptyString: true,
    }),
});

const USPPromotionsDetails = () => {
  const params = useParams();
  let [promotion, setPromotion] = useState([]);
  const navigate = useNavigate();
  const theme = useSelector(state=>state.theme)

  const [cartExpanded, setCartExpanded] = useState(false);
  const userData = useSelector((state) => state.user.userData.data?.data);
  const formik = useFormik({
    initialValues: {
      firstname: userData?.name || "",
      lastname: userData?.last_name || "",
      street: userData?.address || "",
      city: userData?.city || "",
      state: userData?.state || "",
      postcode: userData?.postalCode || "",
      telephone: userData?.phoneNumber || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (value, { setSubmitting }) => {
      placePromotionFreeItemOrderService({
        email: userData?.email,
        user_address: {...value ,region : value.state},
        id: params.promotionId,
      })
        .then(() => {
          toast.success("Successfully Ordered Free Items");
          navigate("/history");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || "Something went wrong!");
        });
    },
  });

  const openCartPage = () => {
    setCartExpanded(true);
  };
  const closeCartPage = () => {
    setCartExpanded(false);
  };

  useEffect(() => {
    myPromotionsService
      .getUSPFreeItems({ id: params.promotionId })
      .then((res) => {
        setPromotion(res?.data || {});
      })
      .catch((err) => {
        navigate("/history");
      });
  }, []);
  return (
    <section className="promotion-details">
      <Row className="mb-2">
        <Column>
          <h2 className="heading">Promotion Details</h2>
        </Column>
      </Row>
      <Theme theme={theme.contentTheme} as={Row}  className="ml-0  part-1">
        <Column className="order-details" md={8} xlg={4} lg={8}>
          <div>
            <h4>Subscription Name</h4>
            <p>{promotion?.subscription_name}</p>
          </div>
          <div>
            <h4>Subscription ID</h4>
            <p>{promotion?.subscription_id}</p>
          </div>
          <div>
            <h4>Invoice Amount</h4>
            <p>${promotion?.invoice_amount}</p>
          </div>
        </Column>
        <Column className="order-details" md={8} xlg={4} lg={8}>
          <div>
            <h4>Promotion Status</h4>
            <p>{promotion?.released ? "Released" : "Pending"}</p>
          </div>
          {promotion?.free_item_order_id && (
            <div>
              <h4>Free Item Order ID</h4>
              <p>{promotion?.free_item_order_id}</p>
            </div>
          )}
          {promotion?.free_items_redeemed_at && (
            <div>
              <h4>Free Items Redeemed On</h4>
              <p>{formatDate(promotion?.free_items_redeemed_at)}</p>
            </div>
          )}
        </Column>
        <Column className="order-details" md={8} xlg={4} lg={8}>
          {promotion?.promotion_released_at && (
            <div>
              <h4>Promotion Released On</h4>
              <p>{formatDate(promotion?.promotion_released_at)}</p>
            </div>
          )}
          {!!promotion?.campaign_id && (
            <div>
              <h4>Gift Card Released</h4>
              <p>True</p>
            </div>
          )}
          {!!promotion?.loyalty_points_earned && (
            <div>
              <h4>Loyalty Points Earned</h4>
              <p>{promotion?.loyalty_points_earned}</p>
            </div>
          )}
        </Column>
      </Theme>
      {!!promotion?.free_items_info?.length && (
        <Row className="my-2">
          <Column>
            <h2 className="heading">Free Items</h2>
          </Column>{" "}
          {!promotion?.is_free_items_redeemed && (
            <Column>
              <div className="d-flex justify-end">
                <Button onClick={openCartPage}>Redeem</Button>
              </div>
            </Column>
          )}
        </Row>
      )}
      {!!promotion?.free_items_info?.length &&
        promotion?.free_items_info?.map((freeItem) => (
          <Theme theme={theme.contentTheme} as={Row} 
            className="ml-0  part-1 position-relative"
            key={freeItem?.id}
          >
            <Column xlg={4} lg={8} md={8} className="order-promotion-image">
              <img src={freeItem?.image_url} />
            </Column>
            <Column xlg={4} lg={8} md={8} className="order-details">
              <div>
                <h4>Product Name</h4>
                <p>{freeItem?.productName}</p>
              </div>
            </Column>
          </Theme>
        ))}
      <Modal
        open={cartExpanded}
        primaryButtonText="Checkout"
        primaryButtonDisabled={!formik.isValid || formik.isSubmitting}
        onRequestSubmit={() => formik.submitForm()}
        onRequestClose={closeCartPage}
        secondaryButtonText="Cancel"
        onSecondarySubmit={closeCartPage}
      >
        <h4>Shipping Details</h4>
        <Form className="checkout__form">
          <div className="checkout__shipping">
            <FormGroup className="formgroup__1" legendText={false}>
              <TextInput
                type="text"
                labelText="First Name"
                id="firstname"
                placeholder="First"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                invalidText={formik.errors.firstname}
                invalid={!!formik.errors.firstname}
              />
              <TextInput
                type="text"
                labelText="Last Name"
                id="lastname"
                placeholder="Last"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                invalidText={formik.errors.lastname}
                invalid={!!formik.errors.lastname}
              />

              <TextInput
                type="text"
                labelText="Phone"
                id="telephone"
                placeholder="Phone"
                value={formik.values.telephone}
                onChange={formik.handleChange}
                invalidText={formik.errors.telephone}
                invalid={!!formik.errors.telephone}
              />
            </FormGroup>
            <FormGroup className="formgroup__2" legendText={false}>
              <TextInput
                labelText="Street"
                id="street"
                placeholder="Street Address"
                value={formik.values.street}
                onChange={formik.handleChange}
                invalidText={formik.errors.street}
                invalid={!!formik.errors.street}
              />
            </FormGroup>
            <FormGroup className="formgroup__3">
              <TextInput
                type="text"
                labelText="City"
                id="city"
                placeholder="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                invalidText={formik.errors.city}
                invalid={!!formik.errors.city}
              />
              <TextInput
                type="text"
                labelText="State"
                id="state"
                placeholder="State"
                value={formik.values.state}
                onChange={formik.handleChange}
                invalidText={formik.errors.state}
                invalid={!!formik.errors.state}
              />
              <TextInput
                type="text"
                labelText="Post Code"
                id="postcode"
                placeholder="Post Code"
                value={formik.values.postcode}
                onChange={formik.handleChange}
                invalidText={formik.errors.postcode}
                invalid={!!formik.errors.postcode}
              />
            </FormGroup>
          </div>
        </Form>
      </Modal>
    </section>
  );
};

export default USPPromotionsDetails;
