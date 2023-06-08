import axios from "axios";

const BASE_URL = "https://www.pre-onboarding-selection-task.shop";

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default authApi;
