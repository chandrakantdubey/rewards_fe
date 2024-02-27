import {
  Column,
  Row,
  Search,
  Button,
  Loading,
  Popover,
  PopoverContent,
  Dropdown,
  Theme,
} from "@carbon/react";
import { FilterEdit } from "@carbon/icons-react";
import CharityCard from "../../components/charityCard/CharityCard";
import "./charity.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryCharityList,
  getCharityList,
  getPreferedCharityList,
} from "../../redux/charity/charitySlice";
import { donationBanner } from "../../constants/banner";
import FullWidget from "../../components/carousel/FullWidget";
import FilterModal from "../../components/filterModal/FilterModal";
import { toggleFilterOverlay } from "../../redux/toggleSlice/toggleSlice";
import useDebounceEffect from "../../hooks/useDebounceEffect";
import useWindowSize from "../../hooks/useWindowSize";

const initialFilters = {
  zip: "",
  city: "",
  name: "",
  category: null,
};

const Charity = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const charityList = useSelector((state) => state.charity.charityList);
  const charityCategoryList = useSelector(
    (state) => state.charity.charityCategoryList
  );
  const preferedCharityList = useSelector(
    (state) => state.charity.preferedCharityList
  );
  const filterOverlay = useSelector((state) => state.toggle.filterOverlay);
  const loyaltyPoints = useSelector(
    (state) => state.loyaltyPoints.loyaltyPoints?.data?.loyaltyPointsBalance
  );
  const [filter, setFilter] = useState(initialFilters);
  const windowSize = useWindowSize();
  const [skip, setSkip] = useState(0);
  const [categoryId, setCategoryId] = useState(1);
  const [displayList, setDisplayList] = useState("preferred");

  const loadMore = () => {
    dispatch(
      getCharityList({
        categoryId: filter.category,
        city: filter.city,
        zip: filter.zip,
        take: 15,
        q: filter.name,
        skip: skip + 15,
        loadMore: true,
        // sort: sort,
      })
    );
    setSkip((skip) => skip + 15);
  };
  const filterFunction = () => {
    setFilter({ ...filter, category: categoryId });
  };

  const handleFilterChange = (e) => {
    if (e?.target?.name === "location") {
      setFilter({
        ...filter,
        [isNaN(e.target.value) ? "city" : "zip"]: e.target.value,
        [!isNaN(e.target.value) ? "city" : "zip"]: "",
      });
    } else if (e.target?.name) {
      setFilter({ ...filter, [e.target.name]: e.target.value });
    }
  };

  const clearFilterFunction = () => {
    setFilter(initialFilters);
    setCategoryId(null);
  };

  useDebounceEffect(
    () => {
      dispatch(
        getCharityList({
          categoryId: filter.category,
          city: filter.city,
          zip: filter.zip,
          take: 15,
          q: filter.name,
          skip: 0,
          // sort: sort,
        })
      );
      setSkip(0);
    },
    1250,
    [filter]
  );

  useEffect(() => {
    dispatch(getPreferedCharityList());
    dispatch(getCategoryCharityList());
    clearFilterFunction();
  }, []);

  useEffect(() => {
    if (
      filter.name ||
      filter.zip ||
      filter.city ||
      filter.category ||
      filter.category == 0
    ) {
      setDisplayList("charity");
    } else {
      setDisplayList("preferred");
    }
  }, [filter]);

  return (
    <>
      {/* row-1 */}

      <Row className="mb-2">
        <Column lg={16}>
          <FullWidget items={donationBanner} showIndicators={true} />
        </Column>
      </Row>

      {/* row-2 */}
      <Row className="mb-2 charity__page">
        <Column
          lg={11}
          md={5}
          sm={4}
          className={`${windowSize?.width < 768 ? "mb-05" : null}`}
        >
          <Search
            size="lg"
            placeholder="Search by Name"
            labelText="Search"
            closeButtonLabelText="Clear search input"
            id="search-1"
            name="name"
            onChange={handleFilterChange}
            value={filter.name}
            onClear={() =>
              handleFilterChange({ target: { name: "name", value: "" } })
            }
          />
        </Column>
        <Column
          lg={4}
          md={2}
          sm={3}
          className={`${windowSize?.width < 768 ? "mb-05" : null}`}
        >
          <Search
            size="lg"
            placeholder="Search by city or zip code"
            labelText="Search"
            closeButtonLabelText="Clear search input"
            id="search-2"
            name="location"
            onChange={handleFilterChange}
            onClear={() =>
              handleFilterChange({ target: { name: "location", value: "" } })
            }
          />
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
            onRequestClose={() => dispatch(toggleFilterOverlay())}
          >
            <Theme theme={theme.contentTheme}>
              <Button
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
                    id="categoryId"
                    titleText="Category"
                    label="Category"
                    items={
                      charityCategoryList?.data?.map((category) => ({
                        id: category?.id,
                        label: category?.label,
                      })) || []
                    }
                    onChange={({ selectedItem }) =>
                      setCategoryId(selectedItem.id)
                    }
                    selectedItem={charityCategoryList?.data?.find(
                      (category) => category.id === categoryId
                    )}
                    itemToString={(item) => (item ? item.label : "")}
                  />
                }
                filterFunction={filterFunction}
                clearFilterFunction={clearFilterFunction}
              />
            </PopoverContent>
          </Popover>
        </Column>
      </Row>

      {/* row-3 */}
      <div className="mb-1 card-container">
        {displayList !== "charity"
          ? preferedCharityList?.data?.map((charity) => (
              <div key={charity?.ein} className="card">
                <CharityCard
                  preferred
                  name={charity?.name}
                  website={charity?.website}
                  logoUrl={charity?.imageUrl || charity?.categoryLogoUrl}
                  description={charity?.additionalDetails?.description}
                  ein={charity?.ein}
                  loyaltyPoints={loyaltyPoints}
                />
              </div>
            ))
          : charityList?.data?.map((charity) => (
              <div key={charity?.ein} className="card">
                <CharityCard
                  name={charity?.name}
                  website={charity?.website}
                  logoUrl={charity?.logoUrl || charity?.categoryLogoUrl}
                  description={charity?.description}
                  ein={charity?.ein}
                  loyaltyPoints={loyaltyPoints}
                />
              </div>
            ))}
      </div>

      {/* row-4 */}
      <Row>
        {charityList?.isLoading ? (
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
              <h4>{charityList?.isLoading && "Getting your charities..."}</h4>
            </Column>
          </>
        ) : (
          <>
            {(displayList == "charity" && !charityList.length) ||
              (displayList == "preferred" &&
                !preferedCharityList?.data?.length && (
                  <Column
                    lg={16}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <h4>
                      {charityList?.data?.length === 0 && "No charities found"}
                    </h4>
                  </Column>
                ))}
          </>
        )}
        {displayList == "charity" && (
          <Column lg={16}>
            {
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={loadMore} kind="ghost">
                  Load More
                </Button>
              </div>
            }
          </Column>
        )}
      </Row>
    </>
  );
};

export default Charity;
