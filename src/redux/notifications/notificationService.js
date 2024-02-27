import { PublicClientApplication } from "@azure/msal-browser";
import notificationApi from "../../api/notificationApi";

import { getErrorMessageAndCode } from "../../services/getErrorFromResponse";
import { msalConfig } from "../../auth/authConfig";

export const getAllNotificationsService = async (pagination) => {
  const msalInstance = new PublicClientApplication(msalConfig);
  let azureId = msalInstance.getAllAccounts()[0]?.idTokenClaims?.sub;
  try {
    let { data } = await notificationApi.post("/show_notification", {
      userid: azureId,
      platform: "uvation rewards",
      ...pagination,
      page_no: pagination.pageNo,
      per_page: pagination.perPage,
    });
    return data;
  } catch (err) {
    let error = getErrorMessageAndCode(err);
    throw error;
  }
};

export const getUnseenNotificationsService = async () => {
  const msalInstance = new PublicClientApplication(msalConfig);
  let azureId = msalInstance.getAllAccounts()[0]?.idTokenClaims?.sub;
  try {
    let { data } = await notificationApi.post("/all_notifications", {
      userid: azureId,
      platform: "uvation rewards",
    });
    return data.data;
  } catch (err) {
    const error = getErrorMessageAndCode(err);
    throw error;
  }
};

export const getDoNotdisturbState = async () => {
  const msalInstance = new PublicClientApplication(msalConfig);
  let azureId = msalInstance.getAllAccounts()[0]?.idTokenClaims?.sub;
  try {
    let { data } = await notificationApi.post("/doNotDisturb", {
      userid: azureId,
    });
    return data.data;
  } catch (err) {
    const error = getErrorMessageAndCode(err);
    throw error;
  }
};

export const updateDoNotdisturbState = async (e) => {
  const msalInstance = new PublicClientApplication(msalConfig);
  let azureId = msalInstance.getAllAccounts()[0]?.idTokenClaims?.sub;
  await notificationApi.post(`/updateDND`, {
    userid: azureId,
    status: e,
  });
};
