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

export async function requestCreateAttractionForAdmin({
  teamId,
  contentId,
  contentTypeId,
  sidoCode,
  gugunCode,
  title,
  address,
  tel,
  zipcode,
  mlevel
}) {
  return await axoisForJSON.delete(`/team/attraction?teamId=${teamId}`, {
    contentId: contentId,
    contentTypeId: contentTypeId,
    sidoCode: sidoCode,
    gugunCode: gugunCode,
    title: title,
    address: address,
    tel: tel,
    zipcode: zipcode,
    latitude: latitude,
    longitude: longitude,
    mlevel: mlevel
  });
}
