import axios from "axios";
import { jwtDecode } from "jwt-decode";

const { VITE_END_POINT } = import.meta.env;

const accessToken = localStorage.getItem("accessToken") && localStorage.getItem("accessToken");
const instance = (contentType) => {
  return axios.create({
    baseURL: VITE_END_POINT,
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};

export const axoisForJSON = instance("application/json;charset=utf-8");
export const axiosForMultipart = instance("multipart/form-data");

axoisForJSON.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem("accessToken");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

axiosForMultipart.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem("accessToken");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

const setInterceptors = (axiosType) => {
  return axiosType.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status }
      } = error;

      if (status === 401) {
        console.log("!!!!! IN 401 !!!!!");
        if (error.response.data.body === "unauthorized") {
          console.log("!!!!! IN EXPIRED !!!!!");
          const originalRequest = config;
          const refreshToken = localStorage.getItem("refreshToken");
          // token refresh 요청

          const { data } = await instance("application/json;charset=utf-8").post(
            `/auth/refreshToken`, // token refresh api
            {},
            { headers: { Authorization: `Bearer ${refreshToken}` } }
          );
          // 새로운 토큰 저장
          // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
          const { apiToken: newAccessToken, refreshToken: newRefreshToken } = data;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
          // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
          return axios(originalRequest);
        }
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log("response error", error);
      return Promise.reject(error);
    }
  );
};

setInterceptors(axoisForJSON);
setInterceptors(axiosForMultipart);
