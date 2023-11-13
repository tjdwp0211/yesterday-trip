<template>
  <div id="map"></div>
</template>

<script setup>
import { ref, onMounted, toRefs } from "vue";
import { PALETTE } from "../../palette";

const { VITE_NAVER_MAP_CLIENT_ID } = import.meta.env;

const props = defineProps({ spots: { type: Object, required: true } });
const { spots } = toRefs(props);
const naverMap = ref(null);
const markers = ref([]);
const infoWindows = ref([]);

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
  spots.value.forEach((spot, i) => {
    markers.value.push(createMarker(spot.mapy, spot.mapx, spot.title));
    infoWindows.value.push(createInfoWindow(spot.title));
  });
};

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
</script>

<style lang="scss">
@import "./TheMap.scss";
</style>
