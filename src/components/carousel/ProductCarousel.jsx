import { useEffect, useState } from "react";
import "./productCarousel.scss";
import { Column, Row } from "@carbon/react";

const ProductCarousel = ({ media }) => {
  const [focusedImage, setFocusedImage] = useState(
    `https://marketplace.uvation.com/media/catalog/product${media?.[0]?.file}`
  );
  const contentImages = media?.map(
    (item) =>
      `https://marketplace.uvation.com/media/catalog/product${item?.file}`
  );

  const handleContentImageClick = (image) => {
    setFocusedImage(image);
  };

  useEffect(() => {
    setFocusedImage(contentImages?.[0]);
  }, [media]);

  return (
    <Row style={{ position: "sticky", top: 0 }}>
      <Column lg={14} md={6} sm={3}>
        <img
          className="product__focused__image"
          src={focusedImage}
          alt="Main Image"
        />
      </Column>
      <Column lg={2} md={2} sm={1}>
        <div className="product__slider__imgs">
          {contentImages?.map((image, index) => (
            <div
              key={index}
              className="product__content__item"
              onClick={() => handleContentImageClick(image)}
            >
              <img src={image} alt={`Content Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </Column>
    </Row>
  );
};

export default ProductCarousel;
