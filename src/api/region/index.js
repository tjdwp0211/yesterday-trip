import { instance } from "..";

export async function requsetSido() {
  return await instance.get(`/region/sido`);
}

export async function requsetGuGUn(sidoCode) {
  return await instance.get(`/region/sido/${sidoCode}`);
}

export async function requsetContentType() {
  return await instance.get(`/region/contentType/`);
}

// 시도 코드, 군구 코드, 콘텐트 타입
