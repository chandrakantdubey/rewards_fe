import {
  Dashboard,
  Store,
  Star,
  Need,
  RecentlyViewed,
} from "@carbon/icons-react";
import { ContainedList, ContainedListItem, Search, Theme } from "@carbon/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import "./header.scss";
import { Link } from "react-router-dom";

const sideNavLinks = [
  {
    path: "/",
    text: "Dashboard",
    icon: Dashboard,
  },
  {
    path: "/marketplace",
    text: "Rewards Market",
    icon: Store,
  },
  {
    path: "/promotions",
    text: "Promotions",
    icon: Star,
  },
  {
    path: "/donations",
    text: "Donations",
    icon: Need,
  },
  {
    path: "/history",
    text: "History",
    icon: RecentlyViewed,
  },
];

export default function GlobalSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // const theme = useTheme();
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    if (searchTerm) {
      const results = sideNavLinks.filter((listItem) =>
        listItem?.text?.toLowerCase()?.includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Search
        placeholder="Filterable search"
        value={searchTerm}
        onChange={handleChange}
        closeButtonLabelText="Clear search input"
        size="lg"
        labelText="Search"
        style={{
          maxwidth: "360px",
          width: "360px",
        }}
      />
      {searchResults && (
        <Theme
          theme={theme.bgTheme === "g100" ? "white" : "g100"}
          as={ContainedList}
          kind="on-page"
          label="Search"
        >
          {searchResults &&
            searchResults.map((listItem) => (
              <Link
                to={listItem?.path}
                key={listItem?.path}
                className="decoration-none"
              >
                <>
                  <ContainedListItem renderIcon={listItem?.icon}>
                    {listItem?.text}
                  </ContainedListItem>
                  {/* <MenuItemDivider /> */}
                </>
              </Link>
            ))}
        </Theme>
      )}
    </div>
  );
}
