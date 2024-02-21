import "@/lib/axiosSetting";
import axios from "axios";

export default async function getUser() {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("accessToken")) {
      let response = undefined;
      await axios
        .get(`/user/my`, { headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }})
        .then((res) => response = res);
      console.log(response);
      return response;
    }
  }
  return undefined;
}