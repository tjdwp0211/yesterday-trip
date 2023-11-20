import { reactive, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user",
  () => {
    const state = reactive({
      email: null,
      exp: null,
      iat: null,
      iss: null,
      nickname: null,
      roles: null,
      userKey: null,
      STATE_IS_FILL: false
    });

    const action = {
      setState(decodedToken) {
        state.email = decodedToken.email;
        state.exp = decodedToken.exp;
        state.iat = decodedToken.iat;
        state.iss = decodedToken.iss;
        state.nickname = decodedToken.nickname;
        state.roles = decodedToken.roles;
        state.userKey = decodedToken.userKey;
        state.STATE_IS_FILL = true;
      },
      clearState() {
        state.email = null;
        state.exp = null;
        state.iat = null;
        state.iss = null;
        state.nickname = null;
        state.roles = null;
        state.userKey = null;
        state.STATE_IS_FILL = false;
      }
    };

    const getter = {
      email() {
        return computed(() => state.email);
      },
      exp() {
        return computed(() => state.exp);
      },
      iat() {
        return computed(() => state.iat);
      },
      iss() {
        return computed(() => state.iss);
      },
      nickname() {
        return computed(() => state.nickname);
      },
      roles() {
        return computed(() => state.roles);
      },
      userKey() {
        return computed(() => state.userKey);
      },
      state() {
        return computed(() => state);
      }
    };

    return { state, action, getter };
  },
  { persist: { key: "user", strategies: [{ storage: localStorage }] } }
);
