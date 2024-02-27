import { Column, Loading, Row, Theme } from "@carbon/react";
import ThirdWidget from "../../components/thirdWidget/ThirdWidget";
import ProductCard from "../../components/productCard/ProductCard";
import { HalfWidget1 } from "../../components/halfWidget/HalfWidget1";
import { HalfWidget2 } from "../../components/halfWidget/HalfWidget2";
import { useEffect } from "react";
import { thirdWidget } from "./homeData";
import { useDispatch, useSelector } from "react-redux";
import { getFreeProducts } from "../../redux/marketPlace/freeProductsSlice";
import { promotionsBanner } from "../../constants/banner";
import { getLoyaltyPoints } from "../../redux/loyaltyPoints/loyaltyPointsSlice";
import { getCredits } from "../../redux/credits/creditsSlice";
import { getMembershipData } from "../../redux/membership/membershipSlice";
import FullWidget from "../../components/carousel/FullWidget";

const Home = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const freeProducts = useSelector((state) => state.freeProducts.freeProducts);
  const membership = useSelector((state) => state.membership.data);
  const userData = useSelector((state) => state.user.userData.data.data);
  const loyaltyPoints = useSelector(
    (state) => state.loyaltyPoints.loyaltyPoints?.data?.loyaltyPointsBalance
  );
  const credits = useSelector(
    (state) => state.credits.credits?.data?.cloudCreditsBalance
  );

  useEffect(() => {
    dispatch(getMembershipData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getFreeProducts({ limit: 4, skip: 0 }));
  }, []);
  useEffect(() => {
    dispatch(getLoyaltyPoints());
  }, []);
  useEffect(() => {
    dispatch(getCredits());
  }, []);

  return (
    <>
      {/* row-1 banner */}
      <Row className="mb-2">
        <Column lg={16}>
          <FullWidget items={promotionsBanner} showIndicators={true} />
        </Column>
      </Row>

      {/* row-2 half widgets */}
      <Row className="mb-2 row-gap-1">
        <Column xlg={8} lg={8} md={8} sm={8}>
          <HalfWidget1
            user={`${userData?.name || ""} ${userData?.last_name || ""}`}
            membership={membership}
            loyaltyPoints={loyaltyPoints}
            credits={credits}
          />
        </Column>
        <Column xlg={8} lg={8} md={8} sm={8}>
          <Theme theme={theme.contentTheme}>
            <HalfWidget2
                user={`${userData?.name || ""} ${userData?.last_name || ""}`}
              cardNum={1234}
              membership={membership}
            />
          </Theme>
        </Column>
      </Row>

      {/* row-3 referals promotions */}
      <Row className="row-gap-1 mb-2">
        {thirdWidget.map((item) => (
          <Column key={item.title}>
            <ThirdWidget {...item} />
          </Column>
        ))}
      </Row>

      {/* row-4 featured products */}
      <Row>
        {freeProducts?.data?.length ? (
          freeProducts?.data?.map((item) => {
            return (
              <Column className="mb-1" xlg={4} lg={8} sm={8} key={item.id}>
                <ProductCard item={item} />
              </Column>
            );
          })
        ) : (
          <>
            <Column
              lg={16}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {freeProducts?.isLoading && <Loading withOverlay={false} />}
            </Column>
            <Column
              lg={16}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h4>
                {freeProducts?.isLoading &&
                  "Getting your featured promotions..."}
              </h4>
              <h4>
                {freeProducts?.data?.totalCount === 0 && "No products found"}
              </h4>
            </Column>
          </>
        )}
      </Row>
    </>
  );
};

export default Home;
