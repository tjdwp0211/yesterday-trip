<template>
  <div id="map"></div>
  <!-- <div >
    <span></span>
    <div>
      <img src="" /><span></span>
    </div>
  </div> -->
</template>

<script setup>
import { ref, reactive, onMounted, toRefs, watch } from "vue";
import { PALETTE } from "../../palette";
import { useNaverMapStore } from "../../stores/naverMap";
import { useAttrectionStore } from "../../stores/attraction";
import { useRouter } from "vue-router";
import { useFormatContentType } from "../../utils/useFormatContentType";
import { useMarkerClustering } from "../../utils/useMarkerClustering";

const { VITE_NAVER_MAP_CLIENT_ID } = import.meta.env;

const router = useRouter();
const naverMapStore = useNaverMapStore();
const attractionStore = useAttrectionStore();

const newMapStates = reactive({ markers: [], infoWindows: [] });

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

const createMarkerComponent = (attraction) => {
  const markerWrapper = document.createElement("div");
  markerWrapper.className = "marker-wrapper";

  const infosContainer = document.createElement("div");
  infosContainer.className = "infos-container-wrapper";

  const contentImg = document.createElement("span");
  contentImg.className = `content-type-img ${useFormatContentType(attraction.contentTypeId).class}`;

  const titleBasket = document.createElement("span");
  titleBasket.className = "title-basket";
  titleBasket.innerText = `${attraction.title.slice(0, 8)}..`;

  const starPointWrapper = document.createElement("div");
  starPointWrapper.className = "star-point-wrapper";
  const starPointImg = document.createElement("span");
  starPointImg.className = "star-point-img";
  const startPointText = document.createElement("span");
  startPointText.className = "star-point-text";
  startPointText.innerText = `${attraction.avgScore}/10`;

  starPointWrapper.appendChild(starPointImg);
  starPointWrapper.appendChild(startPointText);

  infosContainer.appendChild(titleBasket);
  infosContainer.appendChild(starPointWrapper);
  markerWrapper.appendChild(contentImg);
  markerWrapper.appendChild(infosContainer);

  return markerWrapper;
};

const createMarker = (mapY, mapX, attraction) => {
  const markerComponent = createMarkerComponent(attraction);

  return new naver.maps.Marker({
    position: new naver.maps.LatLng(mapY, mapX),
    title: attraction.title,
    map: naverMap.value,
    icon: {
      content: markerComponent,
      size: new naver.maps.Size(22, 35),
      anchor: new naver.maps.Point(11, 35)
    }
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
  let timer;
  // naver.maps.Event.addListener(naverMap.value, "mousemove", (e) => {
  //   if (timer) clearTimeout(timer);

  //   timer = setTimeout(() => {
  //     const attractionList = attractionStore.getter.list().value;
  //     console.log(
  //       `CUR_ZOOM : ${naverMap.value.getZoom()}`,
  //       `CALCED: ${Math.max(Math.abs(10 - naverMap.value.getZoom()), 2)}`
  //     );
  //     useMarkerClustering(attractionList || [], Math.max(Math.abs(7 - naverMap.value.getZoom()), 2));
  //   }, 300);
  // });
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

watch(
  () => attractionStore.state,
  () => {
    if (attractionStore.state) {
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

      // mapViews.infoWindows = attractionStore.getter.list().value.map((attraction, i) => {
      //   center.mapY += attraction.latitude;
      //   center.mapX += attraction.longitude;
      //   zoomSize.maxMapY = Math.max(zoomSize.maxMapY, attraction.latitude);
      //   zoomSize.minMapY = Math.min(zoomSize.maxMapY, attraction.latitude);
      //   zoomSize.maxMapX = Math.max(zoomSize.maxMapX, attraction.longitude);
      //   zoomSize.minMapX = Math.min(zoomSize.maxMapX, attraction.longitude);
      //   return createInfoWindow(attraction.title);
      // });

      mapViews.markers = attractionStore.getter.list().value.map((attraction, i) => {
        const marker = createMarker(attraction.latitude, attraction.longitude, attraction);
        marker.addListener("click", () => router.push(`/map/${i}`));
        return marker;
      });

      center.mapY = center.mapY / attractionStore.state.length;
      center.mapX = center.mapX / attractionStore.state.length;
      moveMapViewPort(center.mapY, center.mapX);
      naverMap.value.morph([center.mapY, center.mapX], 10, true);
    }
  }
);
</script>

<style lang="scss">
@import "./TheMap.scss";
</style>
