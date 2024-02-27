import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFreeGiftItems } from "../../redux/marketPlace/freeProductsSlice";
import { Column, Loading, Row } from "@carbon/react";
import FreeGiftItemCard from "./FreeGiftItemCard";
import RedeemFreeGiftItem from "./RedeemFreeGiftItem";

export default function FreeGiftItems() {
  const dispatch = useDispatch();
  const freeGiftItems = useSelector(
    (state) => state.freeProducts.freeGiftItems
  );
  useEffect(() => {
    dispatch(getFreeGiftItems());
  }, []);

  return (
    <>
      <Row>
        {freeGiftItems?.data?.map((item) => {
          return (
            <Column
              style={{
                marginBottom: "2rem",
              }}
              xlg={4}
              lg={8}
              sm={4}
              key={item.id}
            >
              <FreeGiftItemCard item={item} isFeaturedDiscount={true} />
            </Column>
          );
        })}
        {freeGiftItems?.isLoading ? (
          <>
            <Column
              lg={16}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Loading withOverlay={true} />
            </Column>
            <Column
              lg={16}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h4>{freeGiftItems?.isLoading && "Fetching your products..."}</h4>
            </Column>
          </>
        ) : (
          <Column lg={16} style={{ display: "flex", justifyContent: "center" }}>
            <h4>{freeGiftItems?.data?.length === 0 && "No products found"}</h4>
          </Column>
        )}
      </Row>
      <RedeemFreeGiftItem />
    </>
  );
}
