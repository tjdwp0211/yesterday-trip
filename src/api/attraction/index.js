import { axoisForJSON } from "..";

export async function requsetAttractionByCodes({ sido, gugun, contentType }) {
  return await axoisForJSON.get(`/attraction/search?sido=${sido}&gugun=${gugun}&contentType=${contentType}`);
}

export async function requsetAttractionByKeyword({ keyword }) {
  return await axoisForJSON.get(`/attraction/${keyword}`);
}

// 시도, 군구, 컨텐츠
// /attraction/search?sido= & gugun= & contentType=

// 키워드
// /attraction/:keyword
