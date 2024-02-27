import axios from "axios";
const uspApi = axios.create({
  baseURL: import.meta.env.VITE_USP_UVATION_BASE_URL,
});
export default uspApi;
