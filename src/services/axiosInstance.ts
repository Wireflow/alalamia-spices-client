import axios from "axios";

// TEMPORARY
const TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU2F0IE1hciAyMyAyMDI0IDExOjM4OjAyIEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJpZCI6ImNsdTF2dTllMDAwMDIybzhhYjc1cnpiajQiLCJpYXQiOjE3MTExOTM4ODIsImV4cCI6MTcxMTI0OTg4Mn0.P8Hel9UpigNF0vTUzrYnLHa3ZEALTfYDfMNZ3qL3wGs";

export const api = axios.create({
  baseURL: "http://18.219.242.127/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: TOKEN,
  },
});
