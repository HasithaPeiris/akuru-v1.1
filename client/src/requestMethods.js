import axios from "axios";

const BASE_URL = "https://akuru-v2-734ecd434119.herokuapp.com/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
