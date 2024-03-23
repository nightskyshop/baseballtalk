import axios from "axios";

export const axioInstance = axios.create({
  basePath: process.env.BACKEND_URL,
});
