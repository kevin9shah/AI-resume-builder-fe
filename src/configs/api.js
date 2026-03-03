import axios from "axios";

const rawBaseUrl = (import.meta.env.VITE_BASE_URL || "http://localhost:3000").trim();
const baseURL = rawBaseUrl.replace(/\/+$/, "").replace(/\/api$/, "");

const api = axios.create({
    baseURL
})


export default api;
