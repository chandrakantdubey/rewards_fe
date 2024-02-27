import axios from "axios";
const uvationApi = axios.create({
  baseURL: import.meta.env.VITE_USP_URL,
});
export default uvationApi;
