import { axoisForJSON } from "..";

export async function requestAlarmWholeList() {
  return await axoisForJSON.get(`/notification`);
}

export async function requestReadAlarmList() {
  return await axoisForJSON.get(`/notification/read`);
}

export async function requestNoneReadAlarmList() {
  return await axoisForJSON.get(`/notification/not-read`);
}

export async function requestReadAlarm(alarmId) {
  return await axoisForJSON.get(`/notification/read/${alarmId}`);
}
// accountId: 2
// checked: true
// content: null
// contentTypeId: 12
// createAt: "2023-11-22T11:20:24"
// id: 3
// keyword: "새로운 관광지2"
// sidoName: "서울"
