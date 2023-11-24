import { axoisForJSON } from "..";

export async function requestTeamListForUser() {
  return await axoisForJSON.get(`/team`);
}

export async function requestFollowingForUser(teamId) {
  return await axoisForJSON.get(`/team/${teamId}`);
}

export async function requestUnFollowingTeamForUser(teamId) {
  return await axoisForJSON.delete(`/team/${teamId}`);
}

export async function requestMyTeamListForAdmin() {
  return await axoisForJSON.get(`/team/teams`);
}

export async function requestCheckAddress(address) {
  return await axoisForJSON.get(`/team/find-position?address=${address}`);
}

export async function requestCreateAttractionForAdmin({
  teamId,
  contentTypeId,
  sidoCode,
  gugunCode,
  keyword,
  address,
  tel,
  latitude,
  longitude,
  mlevel
}) {
  return await axoisForJSON.post(`/team/attraction`, {
    teamId: teamId,
    contentTypeId: contentTypeId,
    sidoCode: sidoCode,
    gugunCode: gugunCode,
    keyword: keyword,
    address: address,
    tel: tel,
    latitude: latitude,
    longitude: longitude,
    mlevel: mlevel
  });
}
