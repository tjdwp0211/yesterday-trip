import { instance } from "..";

export async function checkEmail(email) {
  console.log("IN API email :", email);
  return await instance.get(`/account/check/email/${email}`);
}

export async function checkNickname(nickname) {
  return await instance.get(`/account/check/nickname/${nickname}`);
}

export async function requestJoin({ email, password, nickname }) {
  console.log("email :", email);
  console.log("password :", password);
  console.log("nickname :", nickname);
  return await instance.post(`/account/join`, { email: email, password: password, nickname: nickname });
}

export async function requestLogin({ email, password }) {
  return await instance.post(`/auth`, { principal: email, credentials: password });
}
