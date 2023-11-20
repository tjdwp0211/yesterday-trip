import { axoisForJSON } from "..";

export async function requsetAttractionByCodes({ sido, gugun, contentType }) {
  return await axoisForJSON.get(`/attraction/search?sido=${sido}&gugun=${gugun}&contentType=${contentType}`);
}

export async function requsetAttractionByKeyword({ keyword }) {
  return await axoisForJSON.get(`/attraction/${keyword}`);
}

export async function requestBestAttraction() {
  return await axoisForJSON.get(`/attraction/best`);
}

export async function requestBestAttractionBySido({ sido }) {
  return await axoisForJSON.get(`/attraction/best/sido/${sido}`);
}

// 시도, 군구, 컨텐츠
// /attraction/search?sido= & gugun= & contentType=

// 키워드
// /attraction/:keyword
