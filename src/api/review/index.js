import { axoisForJSON, axiosForMultipart } from "..";

export async function requestReviewList(contentId) {
  return await axoisForJSON.get(`/review/list/${contentId}`);
}

export async function requestCreateReview({ contentId, formData }) {
  return await axiosForMultipart.post(`/review/${contentId}`, formData);
}
