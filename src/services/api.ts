import axios from "axios";


export const api = axios.create({
  baseURL: "https://notes-api-ld9c.onrender.com"
})