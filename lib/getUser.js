import "@/lib/axiosSetting";
import axios from "axios";

export default async function getUser() {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("accessToken")) {
      let response = null;
      await axios
        .get(`/user/my`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => (response = res));
      return response;
    }
  }
  return null;
}
