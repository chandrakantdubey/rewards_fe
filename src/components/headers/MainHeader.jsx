import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderName,
  HeaderMenuButton,
  Theme,
  HeaderNavigation,
  HeaderMenuItem,
} from "@carbon/react";
import {
  User,
  Notification,
  ShoppingCartPlus,
  Settings,
  Menu,
  Close,
} from "@carbon/icons-react";
import { Link } from "react-router-dom";
import UserCard from "../userCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import NotificationCard from "../notificationCard/NotificationCard";
import Cart from "../cart/Cart";
import {
  toggleAccount,
  toggleCart,
  toggleNotifications,
  toggleSettings,
  toggleSideNav,
} from "../../redux/toggleSlice/toggleSlice";
import SettingsModal from "../settingsModal/SettingsModal";
import useWindowSize from "../../hooks/useWindowSize";
import GlobalSearch from "./GlobalSearch";
import MainSideNav from "./MainSideNav";

const headerNav = [
  { name: "USP", path: "portal.uvation.com" },
  { name: "Marketplace", path: "marketplace.uvation.com" },
  { name: "Identity", path: "identity.uvation.com" },
  { name: "Support", path: "support.uvation.com" },
];

const MainHeader = () => {
  const dispatch = useDispatch();
  const clientId = useSelector(
    (state) => state.salesForce.userInfoData?.data?.contactInfo?.clientId
  );
  const notifications = useSelector(
    (state) => state?.notifications?.unseenNotifications?.data
  );
  const toggle = useSelector((state) => state.toggle);
  const userData = useSelector((state) => state.user.userData.data?.data);

  const windowSize = useWindowSize();
  const cartCount = useSelector((state) => state.cart.totalItems);

  const notificationDNDStatus = useSelector(
    (state) => state.notifications.toggleNotification.data?.status
  );
  const isSideNavExpanded = useSelector(
    (state) => state.toggle.isSideNavExpanded
  );

  return (
    <Theme theme="g100">
      <HeaderContainer
        render={() => (
          <>
            <Header aria-label="Rewards" className="uvation__header">
              <HeaderMenuButton
                aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => dispatch(toggleSideNav())}
                isActive={isSideNavExpanded}
                renderMenuIcon={
                  isSideNavExpanded ? <Close size={24} /> : <Menu size={24} />
                }
              />

              <HeaderName
                to="/"
                prefix=""
                as={Link}
                style={{ display: "flex", gap: "0.5rem" }}
              >
                <div>
                  <img
                    src="/icons/favicon.ico"
                    height={25}
                    alt=""
                    style={{
                      filter:
                        localStorage.getItem("theme") == "g100"
                          ? "invert(1)"
                          : "invert(1)",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "300",
                    textTransform: "uppercase",
                  }}
                >
                  Rewards
                </div>
              </HeaderName>

              {windowSize?.width > 1056 && (
                <HeaderNavigation aria-label="Uvation">
                  {headerNav.map((item) => (
                    <HeaderMenuItem
                      as={Link}
                      target="blank"
                      to={
                        item?.path === "marketplace.uvation.com"
                          ? `https://${item.path}?customerEmail=${userData?.email}`
                          : `https://${item.path}`
                      }
                      key={item.name}
                      style={{
                        background: "#000",
                        color: "white",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {item.name}
                    </HeaderMenuItem>
                  ))}
                </HeaderNavigation>
              )}

              <HeaderGlobalBar>
                {windowSize?.width > 672 && <GlobalSearch />}

                <HeaderGlobalAction
                  isActive={toggle?.cart}
                  aria-label="Cart"
                  onClick={() => dispatch(toggleCart())}
                >
                  <ShoppingCartPlus size={20} />
                  {+cartCount > 0 && (
                    <span className="notification_count">{cartCount}</span>
                  )}
                </HeaderGlobalAction>

                <HeaderGlobalAction
                  isActive={toggle?.settings}
                  aria-label="Settings"
                  onClick={() => dispatch(toggleSettings())}
                >
                  <Settings size={20} />
                </HeaderGlobalAction>

                <HeaderGlobalAction
                  aria-label="Notifications"
                  isActive={toggle?.notifications}
                  onClick={() => dispatch(toggleNotifications())}
                >
                  <Notification size={20} />
                  {!notificationDNDStatus && notifications?.length >= 1 && (
                    <span className="notification_count">
                      {notifications?.length >= 100
                        ? "99+"
                        : notifications?.length}
                    </span>
                  )}
                </HeaderGlobalAction>

                <HeaderGlobalAction
                  aria-label="User Account"
                  isActive={toggle?.account}
                  onClick={() => dispatch(toggleAccount())}
                  style={{
                    width: "100%",
                    padding: "15px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <User size={20} />
                  {windowSize?.width > 672 && (
                    <span aria-label="User" className="fs-14 fw-400">
                      {userData?.name} {userData?.last_name}
                    </span>
                  )}
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              {windowSize?.width < 659 ? <MainSideNav /> : null}
              {
                <div className="header__panel__width">
                  <UserCard userData={userData} clientId={clientId} />
                  <NotificationCard notifications={notifications} />
                  <Cart />
                  <SettingsModal />
                </div>
              }
            </Header>
          </>
        )}
      />
    </Theme>
  );
};

export default MainHeader;
