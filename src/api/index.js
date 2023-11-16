import axios from "axios";

const { VITE_END_POINT } = import.meta.env;

const instance = (contentType) =>
  axios.create({
    baseURL: VITE_END_POINT,
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });

export const axoisForJSON = instance("application/json;charset=utf-8");
export const axiosForMultipart = instance("multipart/form-data");

// const setInterceptors = (axiosType) => {
//   axiosType.interceptors.response.use(
//     function (response) {
//       // Any status code that lie within the range of 2xx cause this function to trigger
//       // Do something with response data
//       console.log("get response", response);
//       return response;
//     },
//     async (error) => {
//       const {
//         config,
//         response: { status }
//       } = error;
//       if (status === 401) {
//         if (error.response.data.message === "expired") {
//           const originalRequest = config;
//           const refreshToken = await localStorage.getItem("refreshToken");
//           // token refresh 요청
//           const { data } = await axios.post(
//             `http://localhost:3000/refreshToken`, // token refresh api
//             {},
//             { headers: { authorization: `Bearer ${refreshToken}` } }
//           );
//           // 새로운 토큰 저장
//           // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
//           const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;
//           await localStorage.multiSet([
//             ["accessToken", newAccessToken],
//             ["refreshToken", newRefreshToken]
//           ]);
//           originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
//           // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
//           return axios(originalRequest);
//         }
//       }
//       // Any status codes that falls outside the range of 2xx cause this function to trigger
//       // Do something with response error
//       console.log("response error", error);
//       return Promise.reject(error);
//     }
//   );
// };

// setInterceptors(axoisForJSON);
// setInterceptors(axiosForMultipart);
