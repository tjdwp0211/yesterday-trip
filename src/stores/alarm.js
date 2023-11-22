import { reactive, computed } from "vue";
import { defineStore } from "pinia";

export const useAlarmStore = defineStore("alarm", () => {
  const state = reactive({ noneReadList: [], readList: [], lastAlramID: 0, noneReadCount: 0 });

  const action = {
    setNoneReadAlramList(alarms) {
      state.noneReadList = alarms;
    },
    setReadAlramList(alarms) {
      state.readList = alarms;
    },
    setLastAlramID(id) {
      state.lastAlramID = id;
      state.noneReadCount += 1;
    },
    setNoneReadCount() {
      noneReadCount += 1;
    },
    setListAndIDState(alarms, id) {
      state.noneReadList = alarms;
      state.lastAlramID = id;
    },
    clearState() {
      state.noneReadList = [];
      state.lastAlramID = 0;
      state.noneReadCount = 0;
    }
  };

  const getter = {
    oneOfRead(index) {
      return computed(() => state.readList[index]);
    },
    readList() {
      return computed(() => state.readList);
    },
    oneOfNoneRead(index) {
      return computed(() => state.noneReadList[index]);
    },
    noneReadList() {
      return computed(() => state.noneReadList);
    },
    lastAlramID() {
      return computed(() => state.lastAlramID);
    }
  };

  return { state, action, getter };
});
