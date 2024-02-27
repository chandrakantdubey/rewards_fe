import { Button, HeaderPanel, Theme, Toggle } from "@carbon/react";
import { Settings, Asleep, Light, Launch } from "@carbon/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettings } from "../../redux/toggleSlice/toggleSlice";
import "./settingsModal.scss";
import { Link } from "react-router-dom";
import { setDarkTheme, setLightTheme } from "../../redux/theme/themeSlice";
import { switchThemeSocketEmitter } from "../../services/scocketIo";

export default function SettingsModal() {
  const dispatch = useDispatch();
  const idassUrl = "https://identity.uvation.com";
  const settingsToggle = useSelector((state) => state.toggle.settings);
  const theme = useSelector((state) => state.theme);
  const updateTheme = (dark) => {
    if (dark) {
      switchThemeSocketEmitter("g100");
      dispatch(setDarkTheme());
    } else {
      switchThemeSocketEmitter("white");
      dispatch(setLightTheme());
    }
  };
  return (
    <HeaderPanel
      aria-label="User Cart"
      aria-labelledby="User Cart"
      expanded={settingsToggle}
      className="header__panel"
    >
      {settingsToggle && (
        <div className="close" onClick={() => dispatch(toggleSettings())}></div>
      )}
      <Theme theme={theme.contentTheme}>
        <div className="settings__modal">
          <div className="settings__modal__header">
            <h2 style={{}}>
              Settings <Settings size={24} />
            </h2>
          </div>
          <div className="setting__modal__content">
            <div className="settings__modal__themes">
              <h4>Change Theme</h4>
              <Toggle
                labelText=" "
                labelB={<Asleep size={28} />}
                labelA={<Light size={28} />}
                toggled={theme?.bgTheme === "g100"}
                id="toggle-1"
                onToggle={updateTheme}
              />
            </div>
            <div className="settings__modal__profile-details">
              <h4>Edit account details</h4>
              <Button
                as={Link}
                kind="ghost"
                size="sm"
                renderIcon={() => <Launch size={16} />}
                to={`${idassUrl}/account`}
                target="blank"
              >
                Change Password
              </Button>
              <Button
                as={Link}
                kind="ghost"
                size="sm"
                renderIcon={() => <Launch size={16} />}
                to={`${idassUrl}/account`}
                target="blank"
              >
                Personal info
              </Button>
              <Button
                as={Link}
                kind="ghost"
                size="sm"
                renderIcon={() => <Launch size={16} />}
                to={`${idassUrl}/account/siginsession`}
                target="blank"
              >
                Security & Sign In
              </Button>
              <Button
                as={Link}
                kind="ghost"
                size="sm"
                renderIcon={() => <Launch size={16} />}
                to={`${idassUrl}/account/notifications-setting`}
                target="blank"
              >
                Notifications
              </Button>
              <Button
                as={Link}
                kind="ghost"
                size="sm"
                renderIcon={() => <Launch size={16} />}
                to={`${idassUrl}/account/terms`}
                target="blank"
              >
                Privacy
              </Button>
            </div>
            <div className="settings__modal__notifications">
              <h4>System Notifications</h4>
              <p>Enable to recieve login notifications.</p>
              <Toggle
                labelText=" "
                id="66"
                defaultToggled
                disabled
                aria-label="toggle button"
                toggled={true}
              />
            </div>
          </div>
        </div>
      </Theme>

      {/* <div className="settings__modal__main"></div> */}
    </HeaderPanel>
  );
}
