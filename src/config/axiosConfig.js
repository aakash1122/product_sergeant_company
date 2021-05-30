import axios from "axios";
//create .env at project root and set REACT_APP_BACKEND_URL
const backend_url = import.meta.env.VITE_BACKEND_URL;
// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const authAxios = axios.create({
  baseURL: backend_url,
});

const userAxios = axios.create({
  baseURL: backend_url,
  headers: {
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("company-token")
    )}`,
  },
});

const updateAxiosToken = () => {
  if (localStorage.getItem("company-token")) {
    userAxios.defaults.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("company-token")
    )}`;
  }
};

export { authAxios, userAxios, updateAxiosToken };
