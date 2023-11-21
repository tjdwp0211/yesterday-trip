<template>
  <BaseModal
    :width="width"
    :height="height"
    :visiblity="modalStore.state.login"
    @toggle-visiblity="modalStore.action.setLoginState"
  >
    <form class="login-form" @submit.prevent="handleRequestLogin">
      <h2>로그인</h2>
      <div>
        <LoginInput
          id="loginEmail"
          type="email"
          placeholder="아이디"
          :value="loginValues.loginEmail"
          :handler="valueHandler"
        />
      </div>
      <div>
        <LoginInput
          id="loginPassword"
          type="password"
          placeholder="비밀번호"
          :value="loginValues.loginPassword"
          :handler="valueHandler"
        />
      </div>
      <div>
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
        <div class="find-password" @click="handleFindPasswordView">비밀번호를 잊으셨나요?</div>
      </div>
    </form>
  </BaseModal>
</template>
<script setup>
import { reactive, toRefs } from "vue";
import { PALETTE } from "../../palette";
import BaseModal from "../BaseModal/BaseModal.vue";
import BaseButton from "../BaseButton/BaseButton.vue";
import LoginInput from "../LoginInput/LoginInput.vue";
import { useModalStore } from "../../stores/modal";
import { jwtDecode } from "jwt-decode";
import { requestLogin } from "../../api/account";
import { useUserStore } from "../../stores/user";

const modalStore = useModalStore();
const userStore = useUserStore();

const props = defineProps({
  width: { type: String, required: true },
  height: { type: String, required: true }
});

const loginValues = reactive({ loginEmail: "", loginPassword: "" });
const { width, height } = toRefs(props);
const { MAIN_BLUE } = PALETTE;

const valueHandler = (e) => {
  loginValues[e.target.id] = e.target.value;
};

const handleFindPasswordView = () => {
  modalStore.action.setFindPasswordState();
};

const handleRequestLogin = async () => {
  try {
    const res = await requestLogin({ principal: loginValues.loginEmail, credentials: loginValues.loginPassword }).then(
      (res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.apiToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }

        return res.data;
      }
    );
    const decodedAccese = jwtDecode(res.apiToken);
    userStore.action.setState(decodedAccese);

    modalStore.action.setLoginState();
  } catch (err) {
    alert("알 수 없는 에러가 발생하였습니다.");
  }
};
</script>
<style lang="scss">
@import "./LoginModal.scss";
</style>
