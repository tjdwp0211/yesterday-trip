<template>
  <BaseModal
    :width="width"
    :height="height"
    :visiblity="modalStore.state.join"
    @toggle-visiblity="modalStore.action.setJoinState"
  >
    <form class="join-form" @submit.prevent="handleRequestJoin">
      <h2>회원가입</h2>
      <div>
        <p :style="{ visibility: alreadyExistEmail ? 'visible' : 'hidden' }" class="already-exist-email">
          이미 가입된 이메일입니다
        </p>
        <div class="email-wrapper">
          <LoginInput
            id="joinEmail"
            type="email"
            placeholder="이메일"
            :value="joinValues.joinEmail"
            :handler="handleEmailChange"
          />
          <BaseButton
            class="send-email"
            type="button"
            width="68px"
            height="32px"
            color="white"
            :sort-center="true"
            :event-handler="sendAuthCodeToUser"
            :background-color="!alreadyExistEmail && joinValues.joinEmail ? MAIN_BLUE : MAIN_GRAY"
            >메일 인증</BaseButton
          >
        </div>
        <div class="auth-code-wrapper" v-if="emailAuth.sended">
          <BaseInput
            id="auth-code"
            type="text"
            :value="emailAuth.authCode"
            @handle-change="authCodeValueHandler"
            placeholder="메일에 표시된 숫자를 입력해주세요"
          ></BaseInput>
          <BaseButton
            class="send-code"
            type="button"
            width="68px"
            height="32px"
            color="white"
            :sort-center="true"
            :event-handler="sendAuthCodeToServer"
            :background-color="alreadyExistEmail ? MAIN_GRAY : MAIN_BLUE"
            >확인</BaseButton
          >
        </div>
      </div>
      <LoginInput
        id="joinPassword"
        type="password"
        placeholder="비밀번호"
        :value="joinValues.joinPassword"
        :handler="valueHandler"
      />
      <LoginInput
        id="joinNickname"
        type="text"
        placeholder="닉네임"
        :value="joinValues.joinNickname"
        :handler="valueHandler"
      />
      <BaseButton
        type="submit"
        width="124px"
        height="48px"
        color="white"
        :background-color="MAIN_BLUE"
        :sort-center="true"
      >
        가입하기
      </BaseButton>
    </form>
  </BaseModal>
</template>
<script setup>
import { reactive, ref, toRefs } from "vue";
import { PALETTE } from "../../palette";
import BaseModal from "../BaseModal/BaseModal.vue";
import BaseButton from "../BaseButton/BaseButton.vue";
import LoginInput from "../LoginInput/LoginInput.vue";
import { checkDuplicationEmail, requestJoin, checkIsYourEmail, sendAuthCode } from "../../api/account/index.js";
import { useModalStore } from "../../stores/modal";
import BaseInput from "../BaseInput/BaseInput.vue";

const modalStore = useModalStore();

const props = defineProps({
  width: { type: String, required: true },
  height: { type: String, required: true }
});

const joinValues = reactive({ joinEmail: "", joinPassword: "", joinNickname: "" });
const { width, height } = toRefs(props);
const { MAIN_BLUE, MAIN_GRAY } = PALETTE;

const alreadyExistEmail = ref(false);
const emailAuth = reactive({ authCode: "", sended: false });

const valueHandler = (e) => {
  joinValues[e.target.id] = e.target.value;
};
const authCodeValueHandler = (e) => {
  emailAuth.authCode = e.target.value;
};

const handleRequestJoin = async () => {
  try {
    console.log(`test :`, joinValues.joinEmail, joinValues.joinPassword, joinValues.joinNickname);
    await requestJoin({
      email: joinValues.joinEmail,
      password: joinValues.joinPassword,
      nickname: joinValues.joinNickname
    }).then((res) => res.data);

    modalStore.action.setJoinState();
  } catch (err) {
    alert("알 수 없는 에러가 발생하였습니다.");
  }
};

const sendAuthCodeToUser = async () => {
  await checkIsYourEmail(joinValues.joinEmail).then((res) => {
    emailAuth.sended = true;
    console.log(`USER에게 보낸 AUTH CODE :`, res.data);
    return res.data;
  });
};

const sendAuthCodeToServer = async () => {
  await sendAuthCode({ email: joinValues.joinEmail, authCode: emailAuth.authCode }).then((res) => {
    console.log(`SERVER에 보낸 AUTH CODE :`, res.data);
    return res.data;
  });
};

let timer = null;
const handleCheckDuplicationEmail = () => {
  if (timer) clearTimeout(timer);

  timer = setTimeout(async () => {
    if (joinValues.joinEmail) {
      await checkDuplicationEmail(joinValues.joinEmail).then((res) => {
        alreadyExistEmail.value = res.data;
        console.log("이메일 중복 API THEN :", alreadyExistEmail.value);
      });
    }
  }, 500);
};

const handleEmailChange = (e) => {
  valueHandler(e);

  if (e.target.id == "joinEmail" && joinValues.joinEmail) {
    handleCheckDuplicationEmail();
  }
};
</script>
<style lang="scss">
@import "./JoinModal.scss";
</style>
