import { Column, Loading, Row, Theme } from "@carbon/react";
import PromotionSlider from "../../components/promotionSlider/PromotionSlider";
import "./promotions.scss";
import { promotionsData } from "./promotionsData";
import ProductCard from "../../components/productCard/ProductCard";
import ReferFriendModal from "../../components/referFriendModal/ReferFriendModal";
import PromotionsWidget1 from "../../components/promotionsWidget/PromotionsWidget1";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PromotionsWidget2 from "../../components/promotionsWidget/PromotionsWidget2";
import { getFreeProducts } from "../../redux/marketPlace/freeProductsSlice";
import { getMembershipData } from "../../redux/membership/membershipSlice";
import { getLoyaltyPoints } from "../../redux/loyaltyPoints/loyaltyPointsSlice";
import { getCredits } from "../../redux/credits/creditsSlice";
import { getSubscribeToNewsletterStatus } from "../../redux/subscribeToNewsletter/subscribeToNewsletterSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import ProductPromotionCard from "../../components/productCard/ProductPromotionCard";
import { getReferralService } from "../../services/dashboardServices";

const Promotions = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const loyaltyPoints = useSelector(
    (state) => state.loyaltyPoints.loyaltyPoints?.data?.loyaltyPointsBalance
  );
  const credits = useSelector(
    (state) => state.credits.credits?.data?.cloudCreditsBalance
  );
  const newsLetter = useSelector(
    (state) => state.subscribeToNewsletter?.subscribeToNewsletterData?.data
  );
  const profileCompletion = useSelector(
    (state) => state.salesForce.userInfoData?.profileCompletion
  );
  const membership = useSelector((state) => state.membership.data);
  const userData = useSelector((state) => state.user.userData.data?.data);
  const freeProducts = useSelector((state) => state.freeProducts.freeProducts);
  const email = useSelector((state) => state.user.userData?.data?.data?.email);

  useEffect(() => {
    dispatch(getLoyaltyPoints());
  }, []);
  useEffect(() => {
    dispatch(getCredits());
  }, []);
  useEffect(() => {
    dispatch(getMembershipData());
  }, [dispatch]);
  useEffect(() => {
    toast.success(newsLetter?.msg);
    dispatch(getSubscribeToNewsletterStatus(email));
  }, [newsLetter?.msg]);

  useEffect(() => {
    dispatch(
      getFreeProducts({
        limit: 4,
        skip: 0,
        sort: "",
        keyword: "",
        brand: "",
        categoryId: 1,
      })
    );
  }, [location.key]);

  useEffect(() => {
    try {
      const res = getReferralService();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {/* row-1 */}
      <Row className="mb-2">
        <Column lg={16}>
          <h2 className="promotion__title">Your Account</h2>
        </Column>
      </Row>

      {/* row-2 */}
      <Row className="mb-2 row-gap-1">
        <Column xlg={8} lg={8} md={4} sm={8}>
          <PromotionsWidget1
            user={userData?.name + " " + userData?.last_name}
            membership={membership}
            loyaltyPoints={loyaltyPoints}
            credits={credits}
          />
        </Column>
        <Column xlg={8} lg={8} md={4} sm={8}>
          <PromotionsWidget2
            user={userData?.name + " " + userData?.last_name}
            cardNum={1234}
            membership={membership}
          />
        </Column>
      </Row>

      {/* row-3 */}
      <Row className="mb-2">
        <Column lg={16}>
          <h2 className="promotion__title">Uvation Promotions</h2>
        </Column>
      </Row>

      {/* row-4 */}
      <Row className="mb-2">
        <Column lg={16}>
          <Theme theme={theme.contentTheme} className="promotion__slider">
            <PromotionSlider
              promotionsData={promotionsData}
              email={email}
              newsLetterStatus={newsLetter?.status === "success" ? true : false}
              profileCompletion={profileCompletion >= 99.99 ? true : false}
            />
          </Theme>
        </Column>
      </Row>

      {/* row-5 */}
      <Row className="mb-2">
        <Column lg={16}>
          <h2 className="promotion__title">Featured Discounts</h2>
        </Column>
      </Row>

      {/* row-6 featured products */}
      <Row>
        {freeProducts?.data?.length >= 1 ? (
          freeProducts?.data?.map((item) => {
            return (
              <Column
                style={{
                  marginBottom: "1rem",
                }}
                xlg={4}
                lg={8}
                sm={8}
                key={item.id}
              >
                <ProductPromotionCard item={item} />
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
              <h4>{freeProducts?.isError && "Error fetching products..."}</h4>
              <h4>
                {freeProducts?.data?.totalCount === 0 && "No products found"}
              </h4>
            </Column>
          </>
        )}
      </Row>
      {<ReferFriendModal />}
    </>
  );
};

export default Promotions;
