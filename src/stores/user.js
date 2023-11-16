import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user",
  () => {
    const state = ref(null);

    const action = {
      setState(decodedToken) {
        state.value = decodedToken;
      },
      clearState() {
        state.value = null;
      }
    };

    const getter = {
      email() {
        return computed(() => state.value.email);
      },
      exp() {
        return computed(() => state.value.exp);
      },
      iat() {
        return computed(() => state.value.iat);
      },
      iss() {
        return computed(() => state.value.iss);
      },
      nickname() {
        return computed(() => state.value.nickname);
      },
      roles() {
        return computed(() => state.value.roles);
      },
      userKey() {
        return computed(() => state.value.userKey);
      },
      state() {
        return computed(() => state.value);
      }
    };

    return { state, action, getter };
  },
  { persist: { storage: localStorage } }
);
