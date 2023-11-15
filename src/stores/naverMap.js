import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useNaverMapStore = defineStore("naverMap", () => {
  const state = reactive({ markers: [], infoWindows: [] });

  const action = {};

  const getter = {
    markersList() {
      return computed(() => state.markers);
    },
    infoWindowsList() {
      return computed(() => state.infoWindows);
    },
    markerOne(index) {
      return computed(() => state.markers[index]);
    },
    infoWindowOne(index) {
      return computed(() => state.infoWindows[index]);
    },
    getOneCouple(index) {
      return computed(() => ({ marker: state.markers[index], infoWindow: state.infoWindows[index] }));
    }
  };

  return { state, action, getter };
});
