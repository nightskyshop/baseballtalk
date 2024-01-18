import axios from "axios";

export default async function getUser() {
  const id = 1;
  let response = undefined;
  await axios
    .get(`http://localhost:8080/user/${id}`)
    .then((res) => response = res);
  console.log(response);
  return response;
}