<template>
  <BaseModal :width="width" :height="height" :visiblity="visiblity" @toggle-visiblity="viewHandler">
    <form class="join-form" @submit.prevent="handleRequestJoin">
      <h2>회원가입</h2>
      <div>
        <p class="already-exist">이미 가입된 이메일입니다</p>
        <LoginInput id="joinEmail" type="email" placeholder="이메일" :value="emailValue" :handler="handleEmailChange" />
      </div>
      <LoginInput
        id="joinPassword"
        type="password"
        placeholder="비밀번호"
        :value="passwordValue"
        :handler="handleEmailChange"
      />
      <LoginInput
        id="joinNickname"
        type="text"
        placeholder="닉네임"
        :value="nicknameValue"
        :handler="handleEmailChange"
      />
      <BaseButton
        type="submit"
        width="124px"
        height="48px"
        color="white"
        :background-color="MAIN_BLUE"
        :sort-center="true"
      >
        회원가입
      </BaseButton>
    </form>
  </BaseModal>
</template>
<script setup>
import { ref, toRefs } from "vue";
import { PALETTE } from "../../../../palette";
import BaseModal from "../../../BaseModal/BaseModal.vue";
import BaseButton from "../../../BaseButton/BaseButton.vue";
import LoginInput from "../LoginInput/LoginInput.vue";
import { checkEmail } from "../../../../api/account/index.js";

const props = defineProps({
  visiblity: { type: Boolean, required: true },
  width: { type: String, required: true },
  height: { type: String, required: true },
  viewHandler: { type: Function, required: true },
  emailValue: { type: String, required: true },
  passwordValue: { type: String, required: true },
  nicknameValue: { type: String, required: true },
  handleRequestJoin: { type: Function, required: true },
  inputValueHandler: { type: Function, required: true }
});

const {
  visiblity,
  width,
  height,
  viewHandler,
  emailValue,
  passwordValue,
  nicknameValue,
  handleRequestJoin,
  inputValueHandler
} = toRefs(props);
const { MAIN_BLUE } = PALETTE;

const alreadyExistEmail = ref(false);
let timer = null;
const handleCheckEmail = () => {
  if (timer) clearTimeout(timer);

  timer = setTimeout(async () => {
    if (emailValue.value) {
      await checkEmail(emailValue.value).then((res) => {
        alreadyExistEmail.value = res.data;
        console.log("이메일 중복 API THEN :", alreadyExistEmail.value);
      });
    }
  }, 500);
};

const handleEmailChange = (e) => {
  inputValueHandler.value(e);

  if (e.target.id == "joinEmail" && emailValue.value) {
    handleCheckEmail();
  }
};
</script>
<style lang="scss">
@import "./JoinModal.scss";
</style>
