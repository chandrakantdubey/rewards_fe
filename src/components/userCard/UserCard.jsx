import {
  Button,
  CopyButton,
  HeaderPanel,
  Layer,
  Modal,
  RadioTile,
  Theme,
  TileGroup,
  MenuItemDivider,
} from "@carbon/react";
import { Light, Asleep } from "@carbon/icons-react";
import { Logout } from "@carbon/icons-react";
import { useMsal } from "@azure/msal-react";
import { msalConfig } from "../../auth/authConfig";
import "./userCard.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAccount,
  toggleThemeModalOpen,
} from "../../redux/toggleSlice/toggleSlice";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { switchThemeSocketEmitter } from "../../services/scocketIo";
import { setDarkTheme, setLightTheme } from "../../redux/theme/themeSlice";

function UserCard({ userData, photo, clientId }) {
  const { instance } = useMsal();
  const themeModalOpen = useSelector((state) => state.toggle.themeModalOpen);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const profileImage = useSelector(
    (state) => state.salesForce.userInfoData.data.profileImage
  );
  const account = useSelector((state) => state.toggle.account);
  const updateTheme = (themeSelected) => {
    if (themeSelected == "g100") {
      switchThemeSocketEmitter("g100");
      dispatch(setDarkTheme());
    } else {
      switchThemeSocketEmitter("white");
      dispatch(setLightTheme());
    }
  };

  return (
    <>
      <HeaderPanel
        addFocusListeners={false}
        aria-label="Account-panel"
        aria-labelledby="Account-panel"
        expanded={account}
        className="header__panel"
      >
        <Theme theme={theme.contentTheme}>
          <div
            className="close"
            onClick={() => dispatch(toggleAccount())}
          ></div>
          <div className="user__account">
            <div className="user__account__info">
              <div>
                <div className="fs-16 fw-500">Account ID</div>
                <div className="account-id">
                  <span>{clientId}</span>
                  <span
                    onClick={() => {
                      copyToClipboard(clientId);
                    }}
                  >
                    <CopyButton />
                  </span>
                </div>
              </div>
              <div className="profile-image-parent">
                <img
                  src={
                    profileImage
                      ? `${"data:image/png;base64,"}${profileImage}`
                      : "/icons/profile.png"
                  }
                  alt=""
                />
              </div>
            </div>
            <MenuItemDivider />
            <div
              className="cursor-pointer fs-14"
              onClick={() =>
                window.open("https://identity.uvation.com/account", "_blank")
              }
              style={{ padding: "1rem" }}
            >
              Profile
            </div>
            <MenuItemDivider />
            <div
              onClick={() => dispatch(toggleThemeModalOpen())}
              className="cursor-pointer fs-14"
              style={{ padding: "1rem" }}
            >
              Change Theme
            </div>
            <footer style={{ width: "100%" }}>
              <Button
                kind="primary"
                renderIcon={Logout}
                onClick={() => {
                  instance.logoutRedirect(
                    msalConfig.auth.postLogoutRedirectUri
                  );
                  sessionStorage.clear();
                  localStorage.clear();
                }}
                style={{ minWidth: "100%" }}
              >
                Log Out
              </Button>
            </footer>
          </div>
        </Theme>
      </HeaderPanel>
      <Theme theme={theme.bgTheme}>
        <Modal
          size="sm"
          modalHeading="Change Theme"
          open={themeModalOpen}
          onRequestClose={() => dispatch(toggleThemeModalOpen())}
          passiveModal
          className="theme-modal"
        >
          <p>
            Personalize the look and feel of the interface to suit your style.
            Change the UI theme to match your preferences.
          </p>
          <Layer level={theme.contentTheme == "white" ? 1 : 0}>
            <TileGroup
              onChange={(e) => {
                updateTheme(e);
              }}
              defaultSelected={theme.contentTheme == "white" ? "white" : "g100"}
              name="theme tile group"
            >
              <RadioTile
                id="theme-radio-tile-1"
                value="white"
                style={{
                  marginBottom: ".5rem",
                }}
              >
                <Light size={20} className="theme-switch-icons" /> Light
              </RadioTile>
              <RadioTile
                id="theme-radio-tile-2"
                value="g100"
                style={{
                  marginBottom: ".5rem",
                }}
              >
                <Asleep size={20} className="theme-switch-icons" /> Dark
              </RadioTile>
            </TileGroup>
          </Layer>
        </Modal>
      </Theme>
    </>
  );
}

export default UserCard;
