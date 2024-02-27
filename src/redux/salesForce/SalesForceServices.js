import axios from "axios";
import identityApi from "../../api/identityApi";
import { getErrorMessageAndCode } from "../../services/getErrorFromResponse";
export const getSalesForceDataService = async (azureId) => {
  try {
    const { data } = await identityApi.post("/sftoken");
    let contactDataResponse = data.response;
    const { data: userData } = await axios.get(
      `${contactDataResponse?.instance_url}/services/apexrest/ContactInfo?azureId=${azureId}`,
      {
        headers: {
          Authorization: `Bearer ${contactDataResponse?.access_token}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const companyInfo = userData.companyInfo;
    const contactInfoData = userData.contactInfo;
    let profileImage;
    if (contactInfoData?.recordId !== undefined) {
      let profileImageRes = await axios.get(
        `${contactDataResponse?.instance_url}/services/apexrest/ProfileImage?contactId=${contactInfoData?.recordId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${contactDataResponse?.access_token}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      profileImage = profileImageRes.data.base64;
    }
    return {
      companyInfo,
      contactInfo: contactInfoData,
      contactData: contactDataResponse,
      profileImage,
    };
  } catch (err) {
    let error = getErrorMessageAndCode(err);
    throw error;
  }
};
