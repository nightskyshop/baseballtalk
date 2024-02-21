import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

if (typeof window !== "undefined") {
  if (localStorage.getItem("accessToken")) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
  }
}