import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
if (typeof window !== "undefined") {
  if (localStorage.getItem("accessToken")) {
    axios.defaults.headers["authorixation"] = `Bearer ${localStorage.getItem("accessToken")}`;
  }
}