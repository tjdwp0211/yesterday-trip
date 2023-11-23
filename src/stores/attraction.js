import { reactive, computed } from "vue";
import { defineStore } from "pinia";

export const useAttrectionStore = defineStore("attraction", () => {
  const state = reactive({ resAttractions: [], clusteredAttractions: [] });

  const action = {
    setResState(item) {
      state.resAttractions = item;
    },
    clearResState() {
      state.resAttractions = [];
    },
    setClusteredState(item) {
      state.clusteredAttractions = item;
    },
    clearClusteredState() {
      state.clusteredAttractions = [];
    }
  };

  const getter = {
    list() {
      return computed(() => state.resAttractions);
    },
    one(contentId) {
      return computed(() => state.resAttractions.filter((el) => el.contentId === Number(contentId))[0]);
    }
  };

  return { state, action, getter };
});
