import { axoisForJSON } from "..";

export async function requestAlarmList() {
  return await axoisForJSON.get();
}

export async function requestReadAlarm(alarmId) {
  return await axoisForJSON.post();
}
