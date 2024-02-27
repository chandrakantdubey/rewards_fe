import { Button, HeaderPanel, Theme, Toggle } from "@carbon/react";
import { useDispatch, useSelector } from "react-redux";
import "./notificationCard.scss";
import { toggleNotifications } from "../../redux/toggleSlice/toggleSlice";
import {
  dismissAllNotification,
  markNotificationRead,
  updateDoNotdisturbStateThunk,
} from "../../redux/notifications/notificationSlice";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../utils/formatUtils";

function NotificationCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme);
  const notifications = useSelector((state) => state.toggle.notifications);
  const notificationDNDStatus = useSelector(
    (state) => state.notifications.toggleNotification.data?.status
  );
  const unseenNotifications = useSelector(
    (state) => state.notifications.unseenNotifications.data
  );
  return (
    <HeaderPanel
      addFocusListeners={false}
      aria-label="Notification-panel"
      aria-labelledby="Notification-panel"
      expanded={notifications}
      className="header__panel"
    >
      <Theme theme={theme.contentTheme}>
        <div
          className="close"
          onClick={() => dispatch(toggleNotifications())}
        ></div>
        <div className="user__notification">
          <div className="user__notification__content">
            <Theme theme={theme.bgTheme}>
              <div className="notification-header">
                <h6>Notifications</h6>
                <div className="switch">
                  <span>Do not disturb</span>
                  <Toggle
                    hideLabel
                    id="toggle__notification"
                    size="sm"
                    defaultToggled={notificationDNDStatus}
                    onToggle={(e) => {
                      dispatch(updateDoNotdisturbStateThunk(e));
                    }}
                  />
                </div>
              </div>
            </Theme>
            <ul>
              {unseenNotifications?.map((value) => {
                return (
                  <li
                    key={value.id}
                    className="cursor-pointer"
                    onClick={() =>
                      dispatch(markNotificationRead({ id: value.id }))
                    }
                  >
                    <div className="notification-message">{value.message}</div>
                    <div className="notification-time">
                      {formatTime(value.notification_time)}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div style={{ width: "100%", display: "flex", overflow: "hidden" }}>
            <Button
              size="xl"
              kind="primary"
              onClick={() => {
                navigate("/notifications");
                dispatch(toggleNotifications());
              }}
              style={{ minWidth: "50%" }}
            >
              View All
            </Button>
            <Button
              size="xl"
              kind="secondary"
              onClick={() => dispatch(dismissAllNotification())}
              style={{ minWidth: "50%" }}
            >
              Mark As Read
            </Button>
          </div>
        </div>
      </Theme>
    </HeaderPanel>
  );
}

export default NotificationCard;
