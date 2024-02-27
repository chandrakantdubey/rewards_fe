import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Information } from "@carbon/icons-react";
import { toast } from "react-toastify";
import { getPromotionDetail } from "../../services/promotionsService";
import {
  Button,
  Column,
  Form,
  FormGroup,
  Loading,
  Modal,
  RadioButton,
  Row,
  TextInput,
  Theme,
  Tooltip,
} from "@carbon/react";
import { Currency } from "@carbon/icons-react";
import { visitSite } from "../../utils/navigateUtils";
import { getOrderPageLink } from "../../constants/appConstants";
import "./promotionDetails.scss";
import { formatDate } from "../../utils/formatUtils";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { placeFreeItemOrderService } from "../../services/orderService";
import moment from "moment";
import _, { set } from "lodash";

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

const MarketplacePromotionsDetails = () => {
  const [loading, setLoading] = useState(false);
  const { orderId, promotionId } = useParams();
  const [data, setData] = useState();
  const [selectedFreeProduct, setSelectedFreeProduct] = useState({});
  const [selectedLoyaltyPointGroupId, setSelectedLoyaltyPointGroupId] =
    useState([]);
  const adminConfig = useSelector(
    (state) => state.getAdminConfig?.adminConfigData?.configData
  );
  const theme = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData.data?.data);

  const addItemToCart = (item, isGroupSelected) => {
    if (isGroupSelected) {
      let newItems = { ...selectedFreeProduct };
      delete newItems[item?.groupId];
      setSelectedFreeProduct((items) => ({
        ...newItems,
      }));
      setSelectedLoyaltyPointGroupId((items) =>
        _.uniq([...items, item?.groupId])
      );
    } else {
      setSelectedFreeProduct((items) => ({
        ...items,
        [item?.groupId]: item?.id,
      }));
      setSelectedLoyaltyPointGroupId((items) =>
        _.uniq(items.filter((id) => id != item?.groupId))
      );
    }
  };

  const disableRedeem = () => {
    let set = new Set();
    data?.freeItems?.forEach((item) => {
      set.add(item?.groupId);
    });
    return (
      set.size !=
      Object.keys(selectedFreeProduct).length +
        _.uniq(selectedLoyaltyPointGroupId).length
    );
  };

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
      setSubmitting(true);
      setLoading(true);
      placeFreeItemOrderService({
        // email: userData?.email,
        shippingAddress: value,
        orderId: orderId,
        freeItemIds: Object.values(selectedFreeProduct),
        optionalLoyaltyPointsGroupIds: _.uniq(selectedLoyaltyPointGroupId),
      })
        .then((res) => {
          toast.success("Successfully Ordered Free Product");
          closeCartPage();
          navigate("/history");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || "Something went wrong!");
        })
        .finally(() => {
          setSubmitting(false);
          setLoading(false);
        });
    },
  });

  const [cartExpanded, setCartExpanded] = useState(false);
  const fetchPromotionDetail = async () => {
    const response = await getPromotionDetail({
      orderId,
      qsString: { promotionId },
    });
    const responseData = response?.data?.data?.data;
    const errorCode = response?.error?.data?.code;
    if (responseData) {
      setData(responseData);
    } else if (
      errorCode === "ORDER_NOT_EXISTS" ||
      errorCode === "PROMOTION_NOT_FOUND"
    ) {
      toast.error(response?.error?.data?.message);
      navigate("/history");
    } else if (response?.error) {
      toast.error("Something went wrong!");
      navigate("/history");
    }
  };

  const openCartPage = () => {
    setCartExpanded(true);
  };
  const closeCartPage = () => {
    setCartExpanded(false);
  };

  useEffect(() => {
    fetchPromotionDetail();
  }, []);
  return (
    <section className="promotion-details">
      <Row className="mb-2">
        <Column>
          <h2 className="heading">Promotion Details</h2>
        </Column>
      </Row>
      <Theme theme={theme.contentTheme} as={Row} className="ml-0  part-1">
        <Column xlg={4} lg={8} md={8} className="order-promotion-image">
          <img src={data?.bannerImageURL} />
        </Column>
        <Column xlg={4} lg={8} md={8} className="order-details">
          <div>
            <h4>Order ID</h4>
            <p
              onClick={() => {
                if (data?.entityId) visitSite(getOrderPageLink(data?.entityId));
              }}
              className={data?.entityId ? "cursor-pointer hover-underline" : ""}
            >
              {orderId}
            </p>
          </div>
          <div>
            <h4>Order Amount</h4>
            <p>{data?.orderPromotionAmount}</p>
          </div>
          <div>
            <h4>Order Status</h4>
            <p>{data?.orderStatus}</p>
          </div>
          <div>
            <h4>Order Tracking No</h4>
            <p
              onClick={() =>
                visitSite(data?.orderTrackingDetails?.orderTrackingUrl)
              }
              className="hover-underline cursor-pointer"
            >
              {data?.orderTrackingDetails?.orderTrackingNumber}
            </p>
          </div>
        </Column>

        <Column className="order-details" md={8} xlg={4} lg={8}>
          <div>
            <h4>Order Status</h4>
            <p>{data?.orderStatus}</p>
          </div>
          <div>
            <h4>Order Data</h4>
            <p>{formatDate(data?.orderDate)}</p>
          </div>
          <div>
            <h4>Promotion Name</h4>
            <p>{data?.promotionName}</p>
          </div>
        </Column>
        <Column className="order-details" xlg={4} md={8} lg={8}>
          <div>
            <h4>Promotion Status</h4>
            <p>{data?.promotionReleaseStatus}</p>
          </div>
        </Column>
      </Theme>

      {/* part 2 */}
      {!!data?.freeItems?.length && (
        <>
          <Row className="my-2">
            <Column>
              <h2 className="heading">
                Order Free Items
                {data?.orderStatus != "Complete" && (
                  <>
                    &nbsp;
                    <Tooltip
                      align="right-top"
                      label="The free items will only be released once the order has been successfully completed."
                    >
                      <button className="sb-tooltip-trigger" type="button">
                        <Information />
                      </button>
                    </Tooltip>
                  </>
                )}
              </h2>
            </Column>
            {data?.freeItems[0]?.releaseStatus == "Released" &&
              !data?.freeItems[0]?.freeitemsRedeemed && (
                <Column>
                  <div className="d-flex justify-end">
                    <Button disabled={disableRedeem()} onClick={openCartPage}>
                      Redeem
                    </Button>
                  </div>
                </Column>
              )}
          </Row>
          {_.map(_.groupBy(data?.freeItems, "groupId"), (items, key) => (
            <>
              <h3 className="fs-20 fw-400 my-1">Option {key}</h3>
              {items[0]?.optionalLoyaltyPoints &&
                !items[0]?.freeitemsRedeemed && (
                  <Theme
                    theme={theme.contentTheme}
                    as={Row}
                    className="ml-0  part-1 position-relative"
                  >
                    <Column
                      xlg={4}
                      lg={8}
                      md={8}
                      className="order-promotion-image"
                    >
                      <div
                        style={{
                          padding: "2rem",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Currency size={280} />
                      </div>
                    </Column>
                    <Column xlg={4} lg={8} md={8}>
                      <div
                        className="fs-20 fw-500"
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        Loyalty Points: {items[0]?.optionalLoyaltyPoints}
                      </div>
                    </Column>
                    <Column xlg={4} lg={8} md={8} className="order-details">
                      {items?.[0]?.releaseStatus == "Released" &&
                        !items?.[0]?.freeitemsRedeemed && (
                          <RadioButton
                            onClick={(e) =>
                              addItemToCart(
                                {
                                  id: items?.[0]?.id,
                                  groupId: items?.[0]?.groupId,
                                },
                                true
                              )
                            }
                            className="position-absolute free-product-radio"
                            labelText=""
                            name={"FreeItem-" + items?.[0]?.groupId}
                          />
                        )}
                      {/* <SwitcherDivider /> */}
                    </Column>
                  </Theme>
                )}
              {items.map((freeItem) => (
                <Theme
                  theme={theme.contentTheme}
                  as={Row}
                  className="ml-0  part-1 position-relative"
                  key={freeItem?.id}
                >
                  <Column
                    xlg={4}
                    lg={8}
                    md={8}
                    className="order-promotion-image"
                  >
                    <img src={freeItem?.imageUrl} />
                  </Column>
                  <Column xlg={4} lg={8} md={8} className="order-details">
                    <div>
                      <h4>Product Name</h4>
                      <p>{freeItem?.productName}</p>
                    </div>
                    <div>
                      <h4>Product Qty</h4>
                      <p>{freeItem?.productQty}</p>
                    </div>
                    <div>
                      {" "}
                      <h4>Product Release Status</h4>
                      <p>{freeItem?.releaseStatus}</p>
                    </div>
                  </Column>
                  <Column xlg={4} lg={8} md={8} className="order-details">
                    {/* <div>
                  <h4>Product Release Status</h4>
                  <p>{freeItem?.releaseStatus}</p>
                </div> */}
                    {freeItem?.freeitemsRedeemedAt && (
                      <div>
                        <h4>Product Redeemed On</h4>
                        <p>{formatDate(freeItem?.freeitemsRedeemedAt)}</p>
                      </div>
                    )}
                    {freeItem?.freeitemsOrderId && (
                      <div>
                        <h4>Free Item Order ID</h4>
                        <p
                          onClick={() => {
                            if (freeItem?.entityId)
                              visitSite(getOrderPageLink(freeItem?.entityId));
                          }}
                          className={
                            freeItem?.entityId
                              ? "cursor-pointer hover-underline"
                              : ""
                          }
                        >
                          {freeItem?.freeitemsOrderId}
                        </p>
                      </div>
                    )}
                  </Column>
                  <Column xlg={4} lg={8} md={8} className="order-details">
                    {freeItem?.releaseAt ? (
                      <div>
                        <h4>Released On</h4>
                        <p>{formatDate(freeItem?.releaseAt)}</p>
                      </div>
                    ) : (
                      <>
                        {data?.orderStatus == "Complete" &&
                          !freeItem?.releaseAt && (
                            <div>
                              <h4>Releases In</h4>
                              <p>
                                {moment(data?.orderDate)
                                  .add(
                                    adminConfig?.automaticPromotionReleaseDays,
                                    "days"
                                  )
                                  .fromNow()}
                              </p>
                            </div>
                          )}
                      </>
                    )}
                  </Column>
                  {freeItem?.releaseStatus == "Released" &&
                    !freeItem?.freeitemsRedeemed && (
                      <RadioButton
                        onClick={(e) =>
                          addItemToCart({
                            id: freeItem?.id,
                            groupId: freeItem?.groupId,
                          })
                        }
                        className="position-absolute free-product-radio"
                        // checked={freeItem?.id == selectedFreeProduct}
                        labelText=""
                        name={"FreeItem-" + freeItem?.groupId}
                      />
                    )}
                </Theme>
              ))}
            </>
          ))}
          {loading ? (
            <Loading />
          ) : (
            <Modal
              open={cartExpanded}
              primaryButtonText="Checkout"
              primaryButtonDisabled={
                !formik.isValid || formik.isSubmitting || loading
              }
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
                  <FormGroup className="formgroup__3" legendText={false}>
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
          )}
        </>
      )}
    </section>
  );
};

export default MarketplacePromotionsDetails;
