import moment from "moment-with-locales-es6";

export function useTimeGapFormat(dateString) {
  const date = moment(dateString);
  const now = moment();
  const diff = moment.duration(now.diff(date));

  if (diff.asDays() > 1) {
    return `${Math.floor(diff.asDays())}일 전`;
  } else if (diff.asHours() > 1) {
    return `${Math.floor(diff.asHours())}시간 전`;
  } else if (diff.asMinutes() > 1) {
    return `${Math.floor(diff.asMinutes())}분 전`;
  } else {
    return `${Math.floor(diff.asSeconds())}초 전`;
  }
}
