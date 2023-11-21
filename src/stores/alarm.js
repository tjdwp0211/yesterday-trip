import { reactive, computed } from "vue";
import { defineStore } from "pinia";

export const useAlarmStore = defineStore("alarm", () => {
  const state = reactive([]);

  const action = {
    setState(alarms) {
      state = alarms;
    },
    clearState() {
      state = [];
    }
  };

  const getter = {
    one(index) {
      return computed(() => state[index]);
    },
    list() {
      return computed(() => state);
    }
  };

  return { state, action, getter };
});
