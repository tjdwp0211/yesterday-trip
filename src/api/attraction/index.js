import { instance } from "..";

export async function requsetAttraction({ sido, gugun, contentType }) {
  return await instance.get(`/api/attraction/search?sido=${sido}&gugun=${gugun}&contentType=${contentType}`);
}
