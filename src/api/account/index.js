import { axoisForJSON } from "..";

export async function checkEmail(email) {
  return await axoisForJSON.get(`/account/check/email/${email}`);
}

export async function checkNickname(nickname) {
  return await axoisForJSON.get(`/account/check/nickname/${nickname}`);
}

export async function requestJoin({ email, password, nickname }) {
  return await axoisForJSON.post(`/account/join`, { email: email, password: password, nickname: nickname });
}

export async function requestLogin({ principal, credentials }) {
  return await axoisForJSON.post(`/auth`, { principal: principal, credentials: credentials });
}

export async function requestLogOut() {
  return await axoisForJSON.get(`/auth/logout`);
}
