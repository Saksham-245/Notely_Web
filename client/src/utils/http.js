import axios from "axios";
import Cookies from "js-cookie";

const http = axios.create({
  baseURL: "/api/", // replace with your API base URL
});

http.interceptors.request.use(
  function (config) {
    const user = Cookies.get("user"); // get the user cookie
    if (user) {
      const parsedUser = JSON.parse(user); // parse the JSON string
      const token = parsedUser.token; // get the token from the parsed object
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default http;