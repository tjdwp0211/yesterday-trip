import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAttrectionStore = defineStore("attraction", () => {
  const state = ref([]);

  const action = {
    setState(item) {
      state.value = item;
    },
    clearState() {
      state.value = [];
    }
  };

  const getter = {
    list() {
      return computed(() => state.value);
    },
    one(index) {
      return computed(() => state.value[index]);
    }
  };

  return { state, action, getter };
});
