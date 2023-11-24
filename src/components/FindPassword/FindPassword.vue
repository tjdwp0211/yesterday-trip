<template>
  <BaseModal
    :width="width"
    :height="height"
    :visiblity="modalStore.state.findPassword"
    @toggle-visiblity="modalStore.action.setFindPasswordState"
  >
    <form class="find-password-form" @submit.prevent="handleRequestFindPassword">
      <h2>임의 비밀번호 받기</h2>
      <div>
        <LoginInput
          id="findPasswordEmail"
          type="email"
          placeholder="이메일"
          :value="emailValue"
          :handler="valueHandler"
        />
      </div>
      <BaseButton
        type="submit"
        width="124px"
        height="48px"
        color="white"
        :background-color="PALETTE.MAIN_BLUE"
        :sort-center="true"
      >
        메일 전송하기
      </BaseButton>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref } from "vue";
import { useModalStore } from "../../stores/modal";
import BaseModal from "../BaseModal/BaseModal.vue";
import BaseButton from "../BaseButton/BaseButton.vue";
import LoginInput from "../LoginInput/LoginInput.vue";
import { findPassword } from "../../api/account";
import { PALETTE } from "../../palette";

const props = defineProps({
  width: { type: String, required: true },
  height: { type: String, required: true }
});

const emailValue = ref("");
const modalStore = useModalStore();

const handleRequestFindPassword = async () => {
  const res = await findPassword(emailValue.value).then((res) => {
    alert("임시 비밀번호가 전송되었습니다!");
    return res.data;
  });
};

const valueHandler = (e) => {
  emailValue.value = e.target.value;
};
</script>

<style lang="scss">
@import "./FindPassword.scss";
</style>
