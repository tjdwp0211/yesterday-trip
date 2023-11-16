<template>
  <BaseModal :width="width" :height="height" :visiblity="visiblity" @toggle-visiblity="viewHandler">
    <form class="join-form" @submit.prevent="requestLogin">
      <h2>회원가입</h2>
      <div>
        <p :style="{ visibility: alreadyExistEmail ? 'visible' : 'hidden' }" class="already-exist-email">
          이미 가입된 이메일입니다
        </p>
        <LoginInput id="joinEmail" type="email" placeholder="이메일" :value="joinEmail" :handler="handleEmailChange" />
      </div>
      <LoginInput
        id="joinPassword"
        type="password"
        placeholder="비밀번호"
        :value="joinPassword"
        :handler="handleEmailChange"
      />
      <LoginInput
        id="joinNickname"
        type="text"
        placeholder="닉네임"
        :value="joinNickname"
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
import { reactive, ref, toRefs } from "vue";
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
  requestLogin: { type: Function, required: true }
});

const { visiblity, width, height, viewHandler, requestLogin } = toRefs(props);
const { MAIN_BLUE } = PALETTE;

const joinValues = reactive({ joinEmail: "", joinPassword: "", joinNickname: "" });
const { joinEmail, joinPassword, joinNickname } = toRefs(joinValues);

const joinInputsHandler = (e) => {
  joinValues[e.target.id] = e.target.value;
};

const alreadyExistEmail = ref(false);
let timer = null;
const handleCheckEmail = () => {
  if (timer) clearTimeout(timer);

  timer = setTimeout(async () => {
    if (joinEmail.value) {
      await checkEmail(joinEmail.value).then((res) => {
        alreadyExistEmail.value = res.data;
        console.log("이메일 중복 API THEN :", alreadyExistEmail.value);
      });
    }
  }, 500);
};

const handleEmailChange = (e) => {
  joinInputsHandler(e);

  if (e.target.id == "joinEmail" && joinEmail.value) {
    handleCheckEmail();
  }
};
</script>
<style lang="scss">
@import "./JoinModal.scss";
</style>
