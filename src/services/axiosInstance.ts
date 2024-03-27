import { getToken } from "@/hooks/useAuth";
import axios from "axios";

const token = getToken();

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});


