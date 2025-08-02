import axios from "axios";

const apiFast = axios.create({
  baseURL: "http://localhost:8000/",
});

export default apiFast;
