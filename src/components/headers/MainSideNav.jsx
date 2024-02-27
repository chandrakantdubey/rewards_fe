import { SideNav, SideNavLink, Theme, SideNavDivider } from "@carbon/react";
import {
  Dashboard,
  Store,
  Star,
  Need,
  RecentlyViewed,
  Copy,
  ChevronRight,
  IbmCloudCitrixDaas,
  ShoppingCart,
  FingerprintRecognition,
  Forum,
  Gift,
} from "@carbon/icons-react";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideNav } from "../../redux/toggleSlice/toggleSlice";
import useWindowSize from "../../hooks/useWindowSize";
import { useEffect } from "react";

const headerNav = [
  { name: "USP", path: "portal.uvation.com", icon: IbmCloudCitrixDaas },
  { name: "Marketplace", path: "marketplace.uvation.com", icon: ShoppingCart },
  {
    name: "Identity",
    path: "identity.uvation.com",
    icon: FingerprintRecognition,
  },
  { name: "Support", path: "support.uvation.com", icon: Forum },
];

let sideNavLinks = [
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
    path: "/freegift",
    text: "Free Gift Item",
    icon: Gift,
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

export default function MainSideNav() {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const isSideNavExpanded = useSelector(
    (state) => state.toggle.isSideNavExpanded
  );
  const path = useLocation();
  const profileImage = useSelector(
    (state) => state.salesForce.userInfoData.data.profileImage
  );
  const clientId = useSelector(
    (state) => state.salesForce.userInfoData?.data?.contactInfo?.clientId
  );
  const userData = useSelector((state) => state.user.userData.data?.data);
  const location = useLocation();
  function onClickSideNavExpand() {
    dispatch(toggleSideNav());
  }
  console.log(path?.pathname);

  useEffect(() => {
    document.title = `Uvation Rewards | ${
      sideNavLinks.find((item) => item.path === path?.pathname).text
    }`;
  }, [path?.pathname]);

  return (
    (windowSize.width > 1056 || isSideNavExpanded) && (
      <Theme
        theme="g100"
        as={SideNav}
        aria-label="Side navigation"
        expanded={isSideNavExpanded}
        onOverlayClick={onClickSideNavExpand}
        onSideNavBlur={onClickSideNavExpand}
        isRail
        style={{ backgroundColor: "#000" }}
      >
        {windowSize.width < 660 && (
          <>
            <div className="user__account__sidenav">
              <div className="user__account__image">
                <img
                  src={
                    profileImage
                      ? `${"data:image/png;base64,"}${profileImage}`
                      : "/icons/profile.png"
                  }
                  alt=""
                />
              </div>
              <div className="user__account__details">
                <div className="fs-14 fw-500">
                  {userData?.name} {userData?.last_name}
                </div>

                <div
                  className="fs-14 fw-500"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  Account ID <ChevronRight />
                </div>
                <div
                  onClick={() => {
                    copyToClipboard(clientId);
                  }}
                  className="fs-14 fw-500 accountId"
                >
                  {clientId} <Copy size={20} />
                </div>
              </div>
            </div>
            <SideNavDivider />
            {headerNav.map((item) => (
              <SideNavLink
                as={Link}
                target="blank"
                to={`https://${item.path}`}
                renderIcon={item.icon}
                key={item.name}
                large
              >
                {item.name}
              </SideNavLink>
            ))}
            <SideNavDivider />
          </>
        )}

        {sideNavLinks.map((listItem, index) => {
          return (
            <>
              {index === 1 && <SideNavDivider key="divider" />}
              <SideNavLink
                as={Link}
                renderIcon={listItem?.icon}
                to={listItem?.path}
                large
                key={listItem?.text}
                isActive={location.pathname === listItem?.path}
              >
                {listItem?.text}
              </SideNavLink>
            </>
          );
        })}
      </Theme>
    )
  );
}
