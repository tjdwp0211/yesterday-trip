<template>
  <BaseModal :width="width" :height="height" :visiblity="visiblity" @toggle-visiblity="viewHandler">
    <form class="login-form" @submit.prevent="requestLogin">
      <h2>로그인</h2>
      <div>
        <LoginInput
          id="loginEmail"
          type="email"
          placeholder="아이디"
          :value="loginEmail"
          :handler="loginInputsHandler"
        />
      </div>
      <div>
        <LoginInput
          id="loginPassword"
          type="password"
          placeholder="비밀번호"
          :value="loginPassword"
          :handler="loginInputsHandler"
        />
      </div>
      <BaseButton
        type="submit"
        width="124px"
        height="48px"
        color="white"
        :background-color="MAIN_BLUE"
        :sort-center="true"
      >
        로그인
      </BaseButton>
    </form>
  </BaseModal>
</template>
<script setup>
import { reactive, toRefs } from "vue";
import { PALETTE } from "../../../../palette";
import BaseModal from "../../../BaseModal/BaseModal.vue";
import BaseButton from "../../../BaseButton/BaseButton.vue";
import LoginInput from "../LoginInput/LoginInput.vue";
import { useUserStore } from "../../../../stores/user";

const userStore = useUserStore();

const props = defineProps({
  visiblity: { type: Boolean, required: true },
  width: { type: String, required: true },
  height: { type: String, required: true },
  viewHandler: { type: Function, required: true },
  requestLogin: { type: Function, required: true }
});

const { visiblity, width, height, viewHandler, requestLogin } = toRefs(props);
const { MAIN_BLUE } = PALETTE;

const loginValues = reactive({ loginEmail: "", loginPassword: "" });
const { loginEmail, loginPassword } = toRefs(loginValues);

const loginInputsHandler = (e) => {
  loginValues[e.target.id] = e.target.value;
};
</script>
<style lang="scss">
@import "./LoginModal.scss";
</style>
