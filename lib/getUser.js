import axios from "axios";

export default async function getUser() {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("accessToken")) {
      const id = 1;
      let response = undefined;
      await axios
        .get(`http://localhost:8080/user/${id}`)
        .then((res) => response = res);
      console.log(response);
      return response;
    }
  }
}