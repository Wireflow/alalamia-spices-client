import axios from 'axios'


export const api = axios.create({
    baseURL: 'http://http://18.219.242.127/api',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE1hciAyMSAyMDI0IDAyOjMyOjI3IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJpZCI6ImNsdTBtOXQ0ZTAwMDEybzhhMGh2c3F1b2ciLCJpYXQiOjE3MTA5ODgzNDcsImV4cCI6MTcxMTA0NDM0N30.cLvwutwl-pHnpspv9usl0mcGlqwatnZM5w-atEsaowA"
    }
})