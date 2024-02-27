import {
  Button,
  Column,
  ComposedModal,
  Loading,
  ModalBody,
  ModalHeader,
  Row,
  Theme,
} from "@carbon/react";
import "./productDetailsModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleViewProductModal } from "../../redux/toggleSlice/toggleSlice";
import { useEffect, useState } from "react";
import ProductCarousel from "../carousel/ProductCarousel";
import { Add, View } from "@carbon/icons-react";
import { addToCart } from "../../redux/cart/cartSlice";
import {
  formatNumberToAmericanStandard,
  formatNumberToAmericanStandardDec,
} from "../../utils/formatUtils";

const ProductDetailsModal = () => {
  const item = useSelector((state) => state.toggle.productDetails);
  const theme = useSelector((state) => state.theme);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);

  const viewProductModal = useSelector(
    (state) => state.toggle.viewProductModal
  );
  function closeModal() {
    dispatch(toggleViewProductModal());
  }

  const htmlContent = item?.details?.custom_attributes?.[0]?.value;
  let firstPTag = "";
  let remainingPTags = "";
  if (htmlContent) {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlContent, "text/html");
    const pTags = htmlDoc.getElementsByTagName("p");
    if (pTags.length > 0) {
      firstPTag = pTags[0].outerHTML;
      for (let i = 1; i < pTags.length; i++) {
        let content = pTags[i].textContent.split(":");
        if (content.join(":").trim() !== "") {
          content[0] = `<strong>${content[0]}</strong>`;
          remainingPTags += `<p>${content.join(":")}</p><br />`;
        }
      }
    }
  }
  const words = remainingPTags.split(" ");
  const displayedWords = detailsExpanded ? words : words.slice(0, 50);
  const detailsButtonText = detailsExpanded ? "Hide Details" : "See Details";

  const htmlContent2 = item?.details?.custom_attributes?.[6]?.value;
  let listItems = "";

  if (htmlContent2) {
    const parser = new DOMParser();
    const htmlDoc2 = parser.parseFromString(htmlContent2, "text/html");
    const ulTag = htmlDoc2.getElementsByTagName("ul");
    if (ulTag.length > 0) {
      listItems = ulTag[0].outerHTML;
    }
  }

  useEffect(() => {
    setDetailsExpanded(false);
  }, []);

  return (
    <Theme
      theme={theme.bgTheme}
      as={ComposedModal}
      open={viewProductModal}
      onClose={() => {
        closeModal();
        setDetailsExpanded(false);
      }}
      className="productDetailsModal"
      size="lg"
    >
      {loading && <Loading active />}
      <ModalHeader
        buttonOnClick={() => setDetailsExpanded(false)}
      ></ModalHeader>
      <ModalBody>
        <Row className="md-column-reverse productDetailsContent">
          <Column lg={8} md={8} sm={4}>
            <Row className="mb-2">
              <Column lg={16}>
                <div className="fs-32 fw-500">{item?.details?.name}</div>
              </Column>
              <Column lg={16}>
                <div
                  className="fs-16 fw-400"
                  dangerouslySetInnerHTML={{ __html: firstPTag }}
                ></div>
              </Column>
            </Row>

            <Row className="mb-2">
              <Column lg={16} md={8} sm={4}>
                <div
                  className="product__details__list"
                  dangerouslySetInnerHTML={{ __html: listItems }}
                ></div>
              </Column>
            </Row>

            <Row className="mb-1">
              <Column lg={16} md={8} sm={4}>
                <div
                  className="product__details__center"
                  dangerouslySetInnerHTML={{
                    __html:
                      displayedWords.join(" ") + (detailsExpanded ? "" : "..."),
                  }}
                ></div>
              </Column>
            </Row>

            <Row>
              <Column lg={16} md={8} sm={4}>
                <Row className="row-gap-1">
                  <Column lg={16} md={8} sm={4}>
                    <div className="product__details__price">
                      <del>
                        ${" "}
                        {formatNumberToAmericanStandardDec(
                          item?.details?.price
                        )}
                      </del>
                    </div>
                    <div className="product__details__loyalty__points">
                      {formatNumberToAmericanStandard(item?.loyaltyCardPoints)}{" "}
                      Loyalty Points
                    </div>
                  </Column>
                  <Column lg={16} md={8} sm={4}>
                    <div className="product__details__btns">
                      <Button
                        kind="secondary"
                        style={{
                          minWidth: "50%",
                        }}
                        onClick={() => {
                          setDetailsExpanded((prev) => !prev);
                        }}
                      >
                        {detailsButtonText} <View />
                      </Button>

                      <Button
                        kind="primary"
                        style={{
                          minWidth: "50%",
                        }}
                        onClick={() => {
                          dispatch(
                            addToCart({
                              title: item?.details?.sku,
                              loyaltyPoints: item?.loyaltyCardPoints,
                              price: item?.details?.price,
                              src: `https://marketplace.uvation.com/media/catalog/product${item?.details?.media_gallery_entries?.[0]?.file}`,
                              entityId: item?.entityId,
                              id: item?.id,
                              qty: 1,
                            })
                          );
                          dispatch(toggleViewProductModal());
                        }}
                      >
                        Add to cart <Add />
                      </Button>
                    </div>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Column>

          <Column lg={8} md={8} sm={4}>
            <ProductCarousel media={item?.details?.media_gallery_entries} />
          </Column>
        </Row>
      </ModalBody>
    </Theme>
  );
};

export default ProductDetailsModal;
