import { instance } from "..";

export async function checkEmail(email) {
  console.log("IN API email :", email);
  return await instance.get(`/account/check/email/${email}`);
}

export async function checkNickname(nickname) {
  return await instance.get(`/account/check/nickname/${nickname}`);
}

export async function requestJoin({ email, password, nickname }) {
  return await instance.post(`/account/join`, { email: email, password: password, nickname: nickname });
}

export async function requsetLogin() {
  return await instance.get(`/auth`);
}
