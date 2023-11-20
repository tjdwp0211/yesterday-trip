import { reactive, computed } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  const state = reactive({ login: false, join: false, findPassword: false });

  const action = {
    setLoginState() {
      state.login = !state.login;
    },
    setJoinState() {
      state.join = !state.join;
    },
    setFindPassword() {
      state.findPassword = !state.findPassword;
    },
    clearState() {
      state.login = false;
      state.join = false;
    }
  };

  const getter = {
    login() {
      return computed(() => state.login);
    },
    join() {
      return computed(() => state.join);
    },
    findPassword() {
      return computed(() => state.findPassword);
    },
    all() {
      return computed(() => state);
    }
  };

  return { state, action, getter };
});
