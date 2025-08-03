import axios from "axios";

const apiFast = axios.create({
  baseURL: "calculator-api-76gc.onrender.com/",
});

export default apiFast;
