import {
  Column,
  Row,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@carbon/react";
import {
  Purchase,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  GameConsole,
  Plug,
} from "@carbon/icons-react";
import "./marketplace.scss";
import { promotionsBanner } from "../../constants/banner";
import FeaturedRewards from "./FeaturedRewards";
import GiftCards from "./GiftCards";
import FullWidget from "../../components/carousel/FullWidget";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  getCategories,
  getFreeProducts,
} from "../../redux/marketPlace/freeProductsSlice";

let tabs = [Laptop, Tablet, Watch, Headphones, GameConsole, Plug];

const Marketplace = () => {
  const dispatch = useDispatch();
  const fetchProducts = (activeTab) => {
    dispatch(
      getFreeProducts({
        limit: 16,
        skip: 0,
        sort: "",
        keyword: "",
        brand: "",
        categoryId: activeTab,
      })
    );
  };
  const productCategories = useSelector(
    (state) => state.freeProducts.categories
  );
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  return (
    <>
      {/* row-1 */}
      <Row className="mb-2">
        <Column lg={16}>
          <FullWidget items={promotionsBanner} showIndicators={false} />
        </Column>
      </Row>

      {/* row-2 */}
      <Row className="mb-2">
        <Column lg={16}>
          <Tabs>
            <TabList aria-label="List of tabs">
              <Tab onClick={() => fetchProducts()}>All</Tab>
              <Tab renderIcon={Purchase}>Gift Card</Tab>
              {productCategories?.data?.map(
                (category, index) =>
                  category?.id != 1 && (
                    <Tab
                      onClick={() => fetchProducts(category.id)}
                      key={category.id}
                      renderIcon={tabs[index - 1]}
                    >
                      {category.name}
                    </Tab>
                  )
              )}
            </TabList>
            <TabPanels>
              <TabPanel>
                <FeaturedRewards activeTab="" />
              </TabPanel>
              <TabPanel>
                <GiftCards />
              </TabPanel>
              {productCategories?.data?.map((category) => (
                <TabPanel key={category.id}>
                  <FeaturedRewards activeTab={category.id} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Column>
      </Row>
    </>
  );
};

export default Marketplace;
