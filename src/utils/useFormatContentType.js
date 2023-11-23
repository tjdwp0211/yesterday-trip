import Food from "../assets/imgs/food.svg";

export function useFormatContentType(contentType) {
  switch (contentType) {
    case 12:
      return { formatText: "관광", class: "tourism-attraction" };
    case 14:
      return { formatText: "문화", class: "culture-attraction" };
    case 15:
      return { formatText: "축제", class: "festival-attraction" };
    case 28:
      return { formatText: "레포츠", class: "festival-attraction" };
    case 32:
      return { formatText: "숙박", class: "accommodation-attraction" };
    case 39:
      return { formatText: "음식점", class: "food-attraction" };
  }
}

{
  /* <div class="marker-wrapper">
    <span class="content-type-img"></span>
    <div class="infos-container-wrapper">
      <span class="title-basket"></span>
    <div class="star-point-wrapper">
      <span class="star-point-text"></span>
    <span class="star-point-img"></span>
    </div>
    </div> */
}
