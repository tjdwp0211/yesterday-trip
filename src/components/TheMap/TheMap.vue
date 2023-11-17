<template>
  <div id="map"></div>
</template>

<script setup>
import { ref, reactive, onMounted, toRefs, watch } from "vue";
import { PALETTE } from "../../palette";
import { useNaverMapStore } from "../../stores/naverMap";
import { useAttrectionStore } from "../../stores/attraction";
const { VITE_NAVER_MAP_CLIENT_ID } = import.meta.env;

const naverMapStore = useNaverMapStore();
const attractionStore = useAttrectionStore();
console.log("naverMapStore.state :", naverMapStore.state);

const props = defineProps({ attractionItems: { type: Object, required: true } });
const { attractionItems } = toRefs(props);
const naverMap = ref(null);
const markers = ref([]);
const infoWindows = ref([]);
const mapViews = reactive({ markers: [], infoWindows: [] });
// mapViews로 바꾸고 재요청 시 배열 비우고, 다시 그리기 ^_____^

const createMarker = (mapY, mapX, title) => {
  return new naver.maps.Marker({
    position: new naver.maps.LatLng(mapY, mapX),
    title: title,
    map: naverMap.value
  });
};

const createInfoWindow = (title) => {
  const infoWindow = document.createElement("div");
  infoWindow.className = "info-window";
  infoWindow.innerText = title;
  return new naver.maps.InfoWindow({
    content: infoWindow,
    borderColor: PALETTE.MAIN_BLUE,
    borderWidth: 2
  });
};

const viewInfoWindow = (infoWindow, marker) => {
  if (infoWindow.getMap()) infoWindow.close();
  else infoWindow.open(naverMap.value, marker);
};

const moveMapViewPort = (mapY, mapX) => {
  naverMap.value.setCenter(new naver.maps.LatLng(mapY, mapX));
};

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
  };
  naverMap.value = new naver.maps.Map(container, options);
  // attractionItems.value?.forEach((spot, i) => {
  //   markers.value.push(createMarker(spot.latitude, spot.longitude, spot.title));
  //   infoWindows.value.push(createInfoWindow(spot.title));
  // });
};

// address: "대전광역시 서구 둔산로73번길 21";
// contentId: 1932079;
// contentTypeId: 32;
// gugunCode: 3;
// imageUrl: "http://tong.visitkorea.or.kr/cms/resource/87/2584687_image2_1.jpg";
// latitude: 36.3522820205;
// longitude: 127.3816682769;
// mlevel: "6";
// sidoCode: 3;
// tel: "042-489-4000";
// title: "굿모닝레지던스호텔휴[한국관광 품질인증/Korea Quality]";
// zipcode: "35233";

onMounted(() => {
  if (window.naver && window.naver.maps) {
    initMap();
  } else {
    const mapScript = document.createElement("script");
    /* global naver */
    mapScript.onload = () => initMap();
    mapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${VITE_NAVER_MAP_CLIENT_ID}`;
    document.head.appendChild(mapScript);
  }
});

watch(
  () => attractionStore.state,
  () => {
    if (attractionStore.state) {
      markers.value = attractionStore.getter.list().value.map((attraction, i) => {
        return createMarker(attraction.latitude, attraction.longitude, attraction.title);
      });
      infoWindows.value = attractionStore.getter.list().value.map((attraction, i) => {
        return createInfoWindow(attraction.title);
      });
    }
    console.log("IN MARKERS :", markers.value);
    console.log("IN INFOWINDOWS :", infoWindows.value);
  }
);
</script>

<style lang="scss">
@import "./TheMap.scss";
</style>
