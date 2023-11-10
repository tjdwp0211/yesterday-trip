import axios from "axios";

const { VITE_END_POINT } = import.meta.env;

export const instance = axios.create({
  baseURL: VITE_END_POINT,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});
