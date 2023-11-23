<template>
  <div id="map"></div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useAttrectionStore } from "../../stores/attraction";
import { useRouter } from "vue-router";
import { useFormatContentType } from "../../utils/useFormatContentType";
import { useMarkerClustering } from "../../utils/useMarkerClustering";
import { PALETTE } from "../../palette";

const { VITE_NAVER_MAP_CLIENT_ID } = import.meta.env;

const router = useRouter();
const attractionStore = useAttrectionStore();

const naverMap = ref(null);
const mapViews = reactive({
  clusteredMarkers: [],
  markersInstance: [],
  mapPositionY: 37.3595704,
  mapPositionX: 127.105399
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
  titleBasket.innerText = `${attraction.title}`;

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

const deboucingClustering = (absGruopNum) => {
  const resLength = attractionStore.state.resAttractions.length;
  const center = {
    y: resLength > 0 ? 0 : 37.3595704,
    x: resLength > 0 ? 0 : 127.105399
  };

  attractionStore.state.resAttractions.forEach((att) => {
    center.x += att.latitude;
    center.y += att.longitude;
  });

  let timer;
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    const attractionList = attractionStore.state.resAttractions;
    const curViewPosrtBorder = naverMap.value.getBounds();
    const groupNum = absGruopNum ? absGruopNum : Math.max(Math.abs(4 - naverMap.value.getZoom()), 1);

    const listInViewPort = attractionList.filter((attraction) => {
      const validateX = curViewPosrtBorder._min.x < attraction.latitude < curViewPosrtBorder._max.x;
      const validateY = curViewPosrtBorder._min.y < attraction.longitude < curViewPosrtBorder._max.y;
      if (validateX && validateY) {
        return attraction;
      }
    });

    attractionStore.action.setClusteredState(useMarkerClustering(listInViewPort, groupNum));
  }, 300);

  naverMap.value.morph([center.y / resLength - 0.2, center.x / resLength], 10, true);

  let mouseMoveTimer;
  naver.maps.Event.addListener(naverMap.value, "mousemove", (e) => {
    if (mouseMoveTimer) {
      clearTimeout(mouseMoveTimer);
    }
    mouseMoveTimer = setTimeout(() => {
      const attractionList = attractionStore.state.resAttractions;
      const curViewPosrtBorder = naverMap.value.getBounds();
      const groupNum = absGruopNum ? absGruopNum : Math.max(Math.abs(4 - naverMap.value.getZoom()), 1);

      const listInViewPort = attractionList.filter((attraction) => {
        const validateX = curViewPosrtBorder._min.x < attraction.latitude < curViewPosrtBorder._max.x;
        const validateY = curViewPosrtBorder._min.y < attraction.longitude < curViewPosrtBorder._max.y;
        if (validateX && validateY) {
          return attraction;
        }
      });

      attractionStore.action.setClusteredState(useMarkerClustering(listInViewPort, groupNum));
    }, 300);
  });
};

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new naver.maps.LatLng(mapViews.mapPositionY, mapViews.mapPositionX),
    zoom: 8
  };
  naverMap.value = new naver.maps.Map(container, options);
  if (attractionStore.state.resAttractions.length === 3) {
    return deboucingClustering(3);
  } else if (attractionStore.state.resAttractions.length > 0) {
    return deboucingClustering();
  }
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
  () => attractionStore.state.resAttractions,
  () => {
    deboucingClustering();
  }
);

watch(
  () => attractionStore.state.clusteredAttractions,
  () => {
    if (attractionStore.state.clusteredAttractions) {
      if (mapViews.markersInstance) {
        mapViews.markersInstance.forEach((marker, i) => marker.setMap(null));
      }

      mapViews.markersInstance = attractionStore.state.clusteredAttractions.map((attraction, i) => {
        const marker = createMarker(attraction.center.latitude, attraction.center.longitude, attraction.center);
        marker.addListener("click", () => {
          router.push(`/map/${attraction.center.contentId}`);
        });

        return marker;
      });
      const curNaverMap = naverMap.value.getCenter();
      if (attractionStore.state.clusteredAttractions.length === 1) {
        const target = attractionStore.state.clusteredAttractions[0];
        naverMap.value.morph([target.center.longitude, target.center.latitude], naverMap.value.getZoom(), true);
      } else {
        naverMap.value.morph([curNaverMap.y, curNaverMap.x], naverMap.value.getZoom(), true);
      }
    }
  }
);
</script>

<style lang="scss">
@import "./TheMap.scss";
</style>
