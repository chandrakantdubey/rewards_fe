// react imports
import { useEffect, Suspense, useState } from "react";

// third party imports
import axios from "axios";
import * as _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@carbon/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useAccount,
  useIsAuthenticated,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// local imports
import "./app.scss";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Charity from "./pages/charity/Charity";
import Marketplace from "./pages/marketplace/Marketplace";
import Promotions from "./pages/promotions/Promotions";
import History from "./pages/history/History";
import { loginRequest, msalConfig, silentRequest } from "./auth/authConfig";
import { getUserData } from "./redux/user/userDataSlice";
import {
  getAllNotifications,
  getUnseenNotifications,
} from "./redux/notifications/notificationSlice";
import {
  loginUser,
  setSingleSignOn,
} from "./redux/singleSignOn/singleSignOnSlice";
import { getSalesForceData } from "./redux/salesForce/SalesForceSlice";
import { getAzureId } from "./auth/getAzureId";
import { user_signup } from "./services/notificationServices";
import socket from "./services/scocketIo";
import MarketplacePromotionsDetails from "./pages/history/MarketplacePromotionsDetails";
import USPPromotionsDetails from "./pages/history/USPPromotionsDetails";
import NotificationPage from "./pages/notificationsMessages/NotificationsMessages";
import { Helmet } from "react-helmet";
import useWindowSize from "./hooks/useWindowSize";
import FreeGiftItems from "./pages/freeGiftItems/FreeGiftItems";

function App() {
  const dispatch = useDispatch();

  const [account, setAccount] = useState({});
  const windowSize = useWindowSize();

  const { instance, inProgress, accounts } = useMsal();
  const accountuser = useAccount(accounts[0] || {});

  const { error } = useMsalAuthentication();
  const isAuthenticated = useIsAuthenticated();

  const { data, isError } = useSelector(
    (state) => state.singleSignOn.loginData
  );
  socket.on("logoutfromcurrentsite", () => {
    sessionStorage.clear();
    instance.logoutRedirect(msalConfig.auth.postLogoutRedirectUri);
  });
  socket.on("changeCurrentTheme", (e) => {
    // alert("AWdaw")
    // dispatch(selectTheme(e.theme || "white"));
  });
  useEffect(() => {
    try {
      if (!isAuthenticated && inProgress === InteractionStatus.None) {
        instance.loginRedirect(loginRequest);
      } else if (isAuthenticated && accounts) {
        instance.acquireTokenSilent({
          ...silentRequest,
          account: accounts[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [isAuthenticated, inProgress, instance]);

  useEffect(() => {
    if (account?.idTokenClaims?.sub)
      axios
        .post(`${import.meta.env.VITE_IDENTITY_API_BASE_URL}/authToken`, {
          azure_id: account?.idTokenClaims?.sub,
        })
        .then((res) => {
          if (res?.data?.authToken) {
            localStorage.setItem("authToken", res?.data?.authToken);
          }
        });
  }, [account]);

  useEffect(() => {
    dispatch(getSalesForceData(getAzureId()));
  }, []);

  useEffect(() => {
    setAccount(accounts[0] || {});
  }, [accounts]);

  useEffect(() => {
    if (!_.isEmpty(account)) {
      dispatch(setSingleSignOn(account));
      localStorage.setItem("ssoData", account);
      localStorage.setItem("azureId", account?.idTokenClaims?.sub);
      user_signup(accounts, account);
    }
  }, [account]);

  useEffect(() => {
    if (!_.isEmpty(account)) {
      dispatch(
        loginUser({
          azureId: account?.idTokenClaims?.sub,
        })
      );
    }
  }, [account, dispatch]);

  useEffect(() => {
    dispatch(getUserData(accountuser?.idTokenClaims?.sub));
    dispatch(getUnseenNotifications());
    dispatch(getAllNotifications());
  }, [getUnseenNotifications, getAllNotifications, dispatch, accountuser]);

  useEffect(() => {
    if (data && !isError) {
      localStorage.setItem("loginToken", data?.authToken);
    }
  }, [data]);

  useEffect(() => {
    try {
      if (window.clearbit && account?.idTokenClaims) {
        window.clearbit.identify(account?.idTokenClaims?.email, {
          email: account?.idTokenClaims?.email,
          company_domain: "uvation.com",
        });
      }
      if (window?.analytics && account?.idTokenClaims) {
        window?.analytics.identify(account?.idTokenClaims?.sub, {
          name: `${account?.idTokenClaims?.given_name}${" "}${
            account?.idTokenClaims?.family_name
          }`,
          email: account?.idTokenClaims?.email,
        });
        window?.analytics.page("Retail Page", window.location);
      }
    } catch (error) {}
  }, [account]);

  useEffect(() => {
    try {
      if (window?.drift && account?.idTokenClaims?.sub) {
        window?.drift?.identify(account?.idTokenClaims?.sub, {
          email: account?.idTokenClaims?.email,
          numberOfLogins: 1,
          first_name: account?.idTokenClaims?.given_name,
          last_name: account?.idTokenClaims?.family_name,
          phone_number: account?.idTokenClaims?.phoneNumber,
        });
      }
    } catch (err) {
      console.log(err, "drift error");
    }
  }, [window.drift, account]);

  return (
    <>
      <AuthenticatedTemplate>
        <Helmet>
          <script>
            {`
      try {
        ('use strict');
        !(function () {
          var t = (window.driftt = window.drift = window.driftt || []);
          if (!t.init) {
            if (t.invoked)
              return void (
                window.console &&
                console.error &&
                console.error('Drift snippet included twice.')
              );
            (t.invoked = !0),
              (t.methods = [
                'identify',
                'config',
                'track',
                'reset',
                'debug',
                'show',
                'ping',
                'page',
                'hide',
                'off',
                'on',
              ]),
              (t.factory = function (e) {
                return function () {
                  var n = Array.prototype.slice.call(arguments);
                  return n.unshift(e), t.push(n), t;
                };
              }),
              t.methods.forEach(function (e) {
                t[e] = t.factory(e);
              }),
              (t.load = function (t) {
                var e = 3e5,
                n = Math.ceil(new Date() / e) * e,
                o = document.createElement('script');
                (o.type = 'text/javascript'),
                (o.async = !0),
                  (o.crossorigin = 'anonymous'),
                  (o.src =
                    'https://js.driftt.com/include/' + n + '/' + t + '.js');
                var i = document.getElementsByTagName('script')[0];
                i.parentNode.insertBefore(o, i);
              });
          }
        })();
        drift.SNIPPET_VERSION = '0.3.1';
        drift.load('i4vg37pw8cuc');
      } catch {}`}
          </script>
          <script>
            {`  try
             {
        (function () {
          var DRIFT_CHAT_SELECTOR = '.drift-open-chat';
          function ready(fn) {
            if (document.readyState != 'loading') {
              fn();
            } else if (document.addEventListener) {
              document.addEventListener('DOMContentLoaded', fn);
            } else {
              document.attachEvent('onreadystatechange', function () {
                if (document.readyState != 'loading') fn();
              });
            }
          }
          function forEachElement(selector, fn) {
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) fn(elements[i], i);
          }
          function openSidebar(driftApi, event) {
            event.preventDefault();
            driftApi.sidebar.open();
            return false;
          }
          ready(function () {
            drift.on('ready', function (api) {
              var handleClick = openSidebar.bind(this, api);
              forEachElement(DRIFT_CHAT_SELECTOR, function (el) {
                el.addEventListener('click', handleClick);
              });
            });
          });
        })();
      } catch (err) {
        console.log(err);
      }
    `}
          </script>
        </Helmet>
        <Suspense fallback={<Loading active withOverlay />}>
          <Router>
            <Layout>
              {localStorage.getItem("loginToken") && (
                <Routes>
                  <Route exact={true} path="/" element={<Home />} />
                  <Route
                    exact={true}
                    path="/marketplace"
                    element={<Marketplace />}
                  />
                  <Route
                    exact={true}
                    path="/promotions"
                    element={<Promotions />}
                  />
                  <Route
                    exact={true}
                    path="/marketplace/promotions/:orderId/:promotionId"
                    element={<MarketplacePromotionsDetails />}
                  />
                  <Route
                    exact={true}
                    path="/usp/promotions/:promotionId"
                    element={<USPPromotionsDetails />}
                  />
                  <Route exact={true} path="/donations" element={<Charity />} />
                  <Route exact={true} path="/history" element={<History />} />
                  <Route
                    exact={true}
                    path="/notifications"
                    element={<NotificationPage />}
                  />
                  <Route
                    exact={true}
                    path="/freegift"
                    element={<FreeGiftItems />}
                  />
                </Routes>
              )}
            </Layout>
          </Router>
        </Suspense>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Loading withOverlay active />
      </UnauthenticatedTemplate>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={2000}
        style={{
          width: "320px",
          left: windowSize?.width > 480 ? "" : "2em",
        }}
      />
    </>
  );
}

export default App;
