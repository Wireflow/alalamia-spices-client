import { getToken } from "@/hooks/useAuth";
import axios from "axios";

// TEMPORARY
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU2F0IE1hciAyMyAyMDI0IDAxOjAzOjA2IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJpZCI6ImNsdHhuNXZteDAwMDBpazMwZGZzc3RtMXciLCJpYXQiOjE3MTExNTU3ODYsImV4cCI6MTcxMTIxMTc4Nn0.zvUQ0xAAFjuA3QWad3MzIiNrU_zeexErDPLK3ZMwn0Y";

export const api = axios.create({
  baseURL: "http://18.219.242.127/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: TOKEN,
  },
});
