import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGiftCard } from "../../redux/giftCard/giftCardSlice";
import { Button, Column, Form, Loading, Row, Search } from "@carbon/react";
import GiftCard from "../../components/giftCard/GiftCard";
import { getLoyaltyPoints } from "../../redux/loyaltyPoints/loyaltyPointsSlice";
import { getAdminConfig } from "../../redux/getAdminConfig/getAdminConfigSlice";
import { toast } from "react-toastify";

export default function GiftCards() {
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(16);
  const [prevKeyword, setPrevKeyword] = useState("");
  const keywordRef = useRef();
  const giftCards = useSelector((state) => state.giftCards.giftCard);
  const giftCardLoyaltyAmount = useSelector(
    (state) => state.adminConfig.adminConfigData?.configData
  );
  const loyaltyPoints = useSelector(
    (state) => state.loyaltyPoints.loyaltyPoints?.data
  );

  const [inputError, setInputError] = useState(null);
  const validateInput = (input) => {
    const regex = /^[A-Za-z]+$/;
    if (!regex.test(input)) {
      setInputError("Input should only contain letters");
      return false;
    }
    setInputError(null);
    return true;
  };

  const loadMore = () => {
    setOffset((prev) => prev + 16);
  };
  const clearSearchKeyword = () => {
    const currentKeyword = keywordRef.current.value;
    if (prevKeyword !== "" && currentKeyword === "") {
      dispatch(getGiftCard({ limit: 16, offset: 0, skipPrices: true }));
    }
    setPrevKeyword(currentKeyword);
  };

  useEffect(() => {
    dispatch(getLoyaltyPoints());
  }, []);
  useEffect(() => {
    dispatch(getAdminConfig());
  }, []);

  useEffect(() => {
    dispatch(getGiftCard({ limit: limit, offset: offset, skipPrices: true }));
  }, [offset]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            keywordRef.current.value.trim() !== "" &&
            validateInput(keywordRef.current.value)
          ) {
            dispatch(
              getGiftCard({
                limit: 16,
                offset: 0,
                search: keywordRef.current.value,
              })
            );
          } else {
            toast.error("Enter valid search keywords. Only letters allowed.");
          }
        }}
      >
        <Row className="mb-2 row-gap-1">
          <Column sm={3} md={6} lg={12} xlg={12}>
            <Search
              size="lg"
              placeholder="Search Gift Cards"
              labelText="Search"
              closeButtonLabelText="Clear search input"
              id="search"
              ref={keywordRef}
              // invalidText={inputError}
              onChange={() => clearSearchKeyword()}
            />
          </Column>
          <Column sm={1} md={2} lg={4} xlg={4}>
            <Button
              type="submit"
              disabled={giftCards?.isLoading || !keywordRef.current?.value}
              className="marketplace__search__button"
            >
              Search Gift Card
            </Button>
          </Column>
        </Row>
      </Form>
      <Row className="mb-2">
        {giftCards?.data?.length
          ? giftCards?.data?.map((item) => {
              return (
                <Column
                  style={{
                    marginBottom: "2rem",
                  }}
                  xlg={4}
                  lg={8}
                  sm={8}
                  key={item?.brand_code}
                >
                  <GiftCard
                    giftCard={item}
                    giftCardLoyaltyAmount={
                      giftCardLoyaltyAmount?.giftCardLoyaltyAmount
                    }
                    loyaltyPoints={loyaltyPoints?.loyaltyPointsBalance}
                  />
                </Column>
              );
            })
          : null}
      </Row>
      <Row className="mb-2">
        <Column lg={16} style={{ display: "flex", justifyContent: "center" }}>
          {giftCards?.isLoading && <Loading withOverlay={true} />}
        </Column>
        <Column lg={16} style={{ display: "flex", justifyContent: "center" }}>
          {giftCards?.isError && <h4>Error fetching gift cards...</h4>}
          {giftCards?.totalCount === 0 && <h4>No gift cards found</h4>}
        </Column>
      </Row>

      <Row className="mb-2">
        <Column lg={16}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              kind="ghost"
              onClick={() => loadMore()}
              disabled={
                giftCards?.totalCount === giftCards?.data?.length ||
                giftCards?.isLoading
              }
            >
              Load More
            </Button>
          </div>
        </Column>
      </Row>
    </>
  );
}
