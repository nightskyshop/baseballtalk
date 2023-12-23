import axios from "axios";

export const axioInstance = axios.create({
    basePath: "http://localhost:8080"
});