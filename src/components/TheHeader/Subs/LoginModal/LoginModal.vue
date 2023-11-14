<template>
  <BaseModal :width="width" :height="height" :visiblity="visiblity" @toggle-visiblity="viewHandler">
    <form class="login-form" @submit.prevent="handleRequestLogin">
      <h2>로그인</h2>
      <div>
        <LoginInput id="loginEmail" type="text" placeholder="아이디" :value="emailValue" :handler="inputValueHandler" />
      </div>
      <div>
        <LoginInput
          id="loginPassword"
          type="password"
          placeholder="비밀번호"
          :value="passwordValue"
          :handler="inputValueHandler"
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
import { toRefs } from "vue";
import { PALETTE } from "../../../../palette";
import BaseModal from "../../../BaseModal/BaseModal.vue";
import BaseButton from "../../../BaseButton/BaseButton.vue";
import LoginInput from "../LoginInput/LoginInput.vue";

const props = defineProps({
  visiblity: { type: Boolean, required: true },
  width: { type: String, required: true },
  height: { type: String, required: true },
  viewHandler: { type: Function, required: true },
  emailValue: { type: String, required: true },
  passwordValue: { type: String, required: true },
  handleRequestLogin: { type: Function, required: true },
  inputValueHandler: { type: Function, required: true }
});
const { visiblity, width, height, viewHandler, emailValue, passwordValue, handleRequestLogin, inputValueHandler } =
  toRefs(props);
const { MAIN_BLUE } = PALETTE;
</script>
<style lang="scss">
@import "./LoginModal.scss";
</style>
