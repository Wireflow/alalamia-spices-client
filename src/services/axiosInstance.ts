import axios from "axios";

// TEMPORARY
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiRnJpIE1hciAyMiAyMDI0IDAyOjUxOjEzIEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJpZCI6ImNsdHhuNXZteDAwMDBpazMwZGZzc3RtMXciLCJpYXQiOjE3MTEwNzU4NzMsImV4cCI6MTcxMTEzMTg3M30.4dN21BQMJXTNnUwn39-wUjfc5fpVAl4VK2Yno2_aaXA";

export const api = axios.create({
  baseURL: "http://18.219.242.127/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: TOKEN,
  },
});
