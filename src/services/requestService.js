import axios from "axios";

const API_HOST = "https://d1.supercook.com/dyn";
export const Request = () => {
  return axios.create({
    baseURL: API_HOST,
  });
};
