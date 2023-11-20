<template>
  <main id="user-view-wrapper">
    <form class="user-info-container" @submit.prevent="handleRequsetChangePassword">
      <div class="info-text-wrapper">
        <span class="user-page-icon">{{ userStore.getter.nickname()?.value.slice(0, 1).toUpperCase() }}</span>
        <div>
          <p class="nickname">{{ userStore.state.nickname }}</p>
          <p class="email">{{ userStore.state.email }}</p>
        </div>
      </div>
      <div v-if="newPasswordState.visible" class="change-password-input-wrapper">
        <div>
          <LoginInput
            id="new-password"
            :type="newPasswordState.showPassword ? 'text' : 'password'"
            :value="newPasswordState.value"
            placeholder="새 비밀번호를 써주세요"
            :background-color="PALETTE.MAIN_BLUE"
            :handler="handleNewPasswordValue"
          ></LoginInput>
          <img
            v-if="!newPasswordState.showPassword"
            class="password-toggler"
            src="../../assets/imgs/eye.svg"
            @click="newPasswordState.showPassword = true"
            width="18"
            height="18"
          />
          <img
            v-else
            class="password-toggler"
            src="../../assets/imgs/eye-slash.svg"
            @click="newPasswordState.showPassword = false"
            width="18"
            height="18"
          />
        </div>
        <BaseButton
          class="submit-button"
          type="submit"
          width="104px"
          height="36px"
          background-color="white"
          :color="PALETTE.MAIN_BLUE"
          :sortCenter="true"
        >
          비밀번호 바꾸기
        </BaseButton>
      </div>
      <p class="change-password" @click="handleFormVisible">
        {{ !newPasswordState.visible ? "비밀번호 바꾸기" : "취소하기" }}
      </p>
    </form>
  </main>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";
import BaseButton from "../../components/BaseButton/BaseButton.vue";
import { PALETTE } from "../../palette";
import { requestChangePassword } from "../../api/account";
import LoginInput from "../../components/LoginInput/LoginInput.vue";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const newPasswordState = reactive({ visible: false, value: "", showPassword: false });

const handleNewPasswordValue = (e) => {
  newPasswordState.value = e.target.value;
};

const handleFormVisible = () => {
  newPasswordState.visible = !newPasswordState.visible;
  newPasswordState.showPassword = false;
  newPasswordState.value = "";
};

const handleRequsetChangePassword = async () => {
  await requestChangePassword(newPasswordState.value).then((res) => res.data);
};
</script>
<style lang="scss">
@import "./UserView.scss";
</style>
