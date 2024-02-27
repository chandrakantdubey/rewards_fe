import axios from "axios";
import uspApi from "../../api/uspApi";
import { getAzureId } from "../../auth/getAzureId";

export const subscribeToNewsLetterService = async (email) => {
  const formData = new FormData();
  formData.append("method", "newslater");
  formData.append("email", email);
  formData.append("user_id", getAzureId());
  formData.append("toggle", 1);

  try {
    const response = await uspApi.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const subscribeToNewsLetterStatusService = async () => {
  const formData = new FormData();
  formData.append("method", "get_newslater");
  formData.append("user_id", getAzureId());

  try {
    const response = await uspApi.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const termsAndConditionsService = async () => {
  const formData = new FormData();
  formData.append("method", "rewards_microsite_terms_and_conditions");
  try {
    const response = await axios.post(
      "https://cms.uvation.com" + "/all-apis-new",
      formData
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
