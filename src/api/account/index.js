import { axoisForJSON } from "..";

export async function checkIsYourEmail(email) {
  return await axoisForJSON.get(`/account/email/verification-request?email=${email}`);
}

export async function sendAuthCode({ email, authCode }) {
  return await axoisForJSON.get(`/account/email/verification?email=${email}&authCode=${authCode}`);
}

export async function checkDuplicationEmail(email) {
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

export async function findPassword(email) {
  return await axoisForJSON.get(`/account/find-pass?email=${email}`);
}

export async function requestChangePassword(newPassword) {
  return await axoisForJSON.post(`/account/change-pass`, { password: newPassword });
}
