import { getToken } from "@/hooks/useAuth";
import axios from "axios";

const token = getToken();

export const api = axios.create({
  baseURL: "http://18.219.242.127/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});
