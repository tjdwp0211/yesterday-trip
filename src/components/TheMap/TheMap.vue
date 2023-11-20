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

// const props = defineProps({ attractionItems: { type: Object, required: true } });
// const { attractionItems } = toRefs(props);
const naverMap = ref(null);
const mapViews = reactive({
  markers: [],
  infoWindows: [],
  mapPositionY: 37.3595704,
  mapPositionX: 127.105399,
  zoom: 10
});
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
    center: new naver.maps.LatLng(mapViews.mapPositionY, mapViews.mapPositionX),
    zoom: mapViews.zoom
  };
  naverMap.value = new naver.maps.Map(container, options);
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
      console.log("attractionStore.state :", attractionStore.state);

      let center = {
        mapY: 0,
        mapX: 0
      };
      let zoomSize = {
        minMapY: 0,
        maxMapY: 0,
        minMapX: 0,
        maxMapX: 0
      };
      mapViews.markers.forEach((marker, i) => marker.setMap(null));
      mapViews.infoWindows.forEach((infoWindow, i) => infoWindow.setMap(null));

      mapViews.infoWindows = attractionStore.getter.list().value.map((attraction, i) => {
        center.mapY += attraction.latitude;
        center.mapX += attraction.longitude;
        zoomSize.maxMapY = Math.max(zoomSize.maxMapY, attraction.latitude);
        zoomSize.minMapY = Math.min(zoomSize.maxMapY, attraction.latitude);
        zoomSize.maxMapX = Math.max(zoomSize.maxMapX, attraction.longitude);
        zoomSize.minMapX = Math.min(zoomSize.maxMapX, attraction.longitude);
        return createInfoWindow(attraction.title);
      });
      mapViews.markers = attractionStore.getter.list().value.map((attraction, i) => {
        const marker = createMarker(attraction.latitude, attraction.longitude, attraction.title);
        marker.addListener("click", () => viewInfoWindow(mapViews.infoWindows[i], marker));
        return marker;
      });
      center.mapY = center.mapY / attractionStore.state.length;
      center.mapX = center.mapX / attractionStore.state.length;
      moveMapViewPort(center.mapY, center.mapX);
      naverMap.value.morph([center.mapY, center.mapX], 12, true);
    }
    // console.log("attractionStore.state.length :", attractionStore.state.length);
    // console.log("IN MARKERS :", mapViews.markers);
    // console.log("IN INFOWINDOWS :", mapViews.infoWindows);
  }
);
</script>

<style lang="scss">
@import "./TheMap.scss";
</style>
