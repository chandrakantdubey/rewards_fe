import {
  Column,
  Loading,
  Row,
  Search,
  Select,
  SelectItem,
  Popover,
  PopoverContent,
  Button,
  Dropdown,
  Theme,
} from "@carbon/react";
import ProductCard from "../../components/productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getFreeProducts } from "../../redux/marketPlace/freeProductsSlice";
import { FilterEdit } from "@carbon/icons-react";
import { toggleFilterOverlay } from "../../redux/toggleSlice/toggleSlice";
import { useState } from "react";
import FilterModal from "../../components/filterModal/FilterModal";
import useDebounceEffect from "../../hooks/useDebounceEffect";

export default function FeaturedRewards({ activeTab }) {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");
  const [skip, setSkip] = useState(0);
  const [brand, setBrand] = useState(null);
  const theme = useSelector((state) => state.theme);
  const freeProducts = useSelector((state) => state.freeProducts.freeProducts);
  const filterOverlay = useSelector((state) => state.toggle.filterOverlay);
  const brands = useSelector((state) => state.freeProducts.brands);

  const loadMore = () => {
    setSkip((prev) => prev + 16);
  };
  const searchByKeyword = (event) => {
    setKeyword(event.target.value);
    setSort("");
    setSkip(0);
  };
  const sortBy = (event) => {
    setSort(event.target.value);
    setKeyword("");
    setSkip(0);
  };
  const filterByBrand = () => {
    dispatch(
      getFreeProducts({
        limit: 16,
        skip: skip,
        sort: sort,
        keyword: keyword,
        brand: brand,
        categoryId: activeTab,
      })
    );
  };
  const clearFilter = () => {
    setBrand("");
    setSort("");
    setKeyword("");
    dispatch(
      getFreeProducts({
        limit: 16,
        skip: skip,
        sort: "",
        keyword: "",
        brand: "",
        categoryId: activeTab,
      })
    );
  };
  useDebounceEffect(
    () => {
      dispatch(
        getFreeProducts({
          limit: 16,
          skip: skip,
          sort: sort,
          keyword: keyword,
          brand: brand,
          category: activeTab,
        })
      );
    },
    1250,
    [skip, sort, keyword]
  );

  return (
    <>
      {/* row-1 */}
      <Row className="mb-2 row-gap-1">
        <Column lg={12} md={5} sm={4}>
          <Search
            size="lg"
            placeholder="Search Uvation Rewards"
            labelText="Search"
            closeButtonLabelText="Clear search input"
            id="search"
            onChange={(e) => searchByKeyword(e)}
          />
        </Column>
        <Column
          style={{ display: "flex", justifyContent: "center" }}
          lg={3}
          md={2}
          sm={3}
        >
          <Select noLabel id="select" onChange={(e) => sortBy(e)}>
            <SelectItem value="" text="---sort by---" />
            <SelectItem value="price_asc" text="Sort by: Price-Low" />
            <SelectItem value="price_desc" text="Sort by: Price-High" />
            <SelectItem
              value="loyalty_points_asc"
              text="Sort by: Loyalty Points-Low"
            />
            <SelectItem
              value="loyalty_points_desc"
              text="Sort by: Loyalty Points-High"
            />
          </Select>
        </Column>
        <Column
          lg={1}
          md={1}
          sm={1}
          style={{ display: "flex", justifyContent: "end" }}
        >
          <Popover
            align="bottom-right"
            open={filterOverlay}
            isTabTip
            // onRequestClose={() => dispatch(toggleFilterOverlay())}
          >
            <Theme theme={theme.contentTheme}>
              <Button
                label="Filter"
                hasIconOnly
                kind="ghost"
                onClick={() => dispatch(toggleFilterOverlay())}
                className="marketplace__filter"
              >
                <FilterEdit size={20} />
              </Button>
            </Theme>
            <PopoverContent>
              <FilterModal
                child1={
                  <Dropdown
                    id="brand"
                    titleText="Brand"
                    label="Brand"
                    items={
                      brands?.data
                        ?.filter((item) => item?.value)
                        ?.map((item) => ({
                          id: item?.value,
                          label: item?.label,
                        })) || []
                    }
                    onChange={({ selectedItem }) => setBrand(selectedItem.id)}
                    selectedItem={brands?.data?.find(
                      (item) => item.id === brand
                    )}
                  />
                }
                filterFunction={filterByBrand}
                clearFilterFunction={clearFilter}
              />
            </PopoverContent>
          </Popover>
        </Column>
      </Row>

      {/* row-2 */}
      <Row>
        {freeProducts?.data?.map((item) => {
          return (
            <Column
              style={{
                marginBottom: "2rem",
              }}
              xlg={4}
              lg={8}
              sm={8}
              key={item.id}
            >
              <ProductCard item={item} />
            </Column>
          );
        })}
        {freeProducts?.isLoading ? (
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
              <h4>{freeProducts?.isLoading && "Fetching your products..."}</h4>
            </Column>
          </>
        ) : (
          <Column lg={16} style={{ display: "flex", justifyContent: "center" }}>
            <h4>{freeProducts?.data?.length === 0 && "No products found"}</h4>
          </Column>
        )}
      </Row>

      <Row>
        <Column lg={16}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {freeProducts?.totalCount !== freeProducts?.data?.length && (
              <Button
                kind="ghost"
                onClick={loadMore}
                disabled={
                  freeProducts?.totalCount === freeProducts?.data?.length
                }
              >
                Load More
              </Button>
            )}
          </div>
        </Column>
      </Row>
    </>
  );
}
