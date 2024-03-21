import axios from "axios";

// TEMPORARY
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE1hciAyMSAyMDI0IDAxOjEwOjExIEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJpZCI6ImNsdTBqYm1vNzAwMDAybzhhdTNheno2aWUiLCJpYXQiOjE3MTA5ODM0MTEsImV4cCI6MTcxMTAzOTQxMX0.wJob_NqI_N5XY85PAXQAP5KnKywdNflqvh7f-9h55bA";

export const api = axios.create({
  baseURL: "http://18.219.242.127/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: TOKEN,
  },
});
