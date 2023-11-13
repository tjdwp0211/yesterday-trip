<template>
  <header>
    <img src="/logo.png" width="144" height="48" />
    <SearchInput :value="searchValue" :handler="search" />
    <div @focusin="dropBox" @focusout="dropBox">
      <Button
        type="button"
        width="80px"
        height="48px"
        background-color="white"
        class="drop-box-opener"
        :color="MAIN_GRAY"
      >
        <img src="../../assets/imgs/bars.svg" width="20" height="20" />
        <img id="user-img" src="../../assets/imgs/unknowen-user.svg" width="32" height="32" />
        <DropBox width="120px" height="96px" :drop-box-view="viewStateBasket.dropBox" :drop-box-view-handler="dropBox">
          <a class="modal-opener" @click="loginModal">로그인</a>
          <a class="modal-opener" @click="joinModal">회원가입</a>
        </DropBox>
      </Button>
    </div>
  </header>
  <Modal width="568px" height="412px" :visiblity="viewStateBasket.login" @toggle-visiblity="loginModal">
    <form class="login-form">
      <h2>로그인</h2>
      <LoginInput id="loginEmail" type="text" placeholder="아이디" :value="loginEmail" :handler="login" />
      <LoginInput id="loginPassword" type="password" placeholder="비밀번호" :value="loginPassword" :handler="login" />
      <Button type="submit" width="72px" height="36px" color="white" :background-color="MAIN_BLUE" :sort-center="true">
        로그인
      </Button>
      <!-- 위 버튼 submit type으로 변경 후 form에 submit 달기 -->
    </form>
  </Modal>
  <Modal width="568px" height="520px" :visiblity="viewStateBasket.join" @toggle-visiblity="joinModal">
    <form class="join-form" @submit.prevent="handleRequestJoin">
      <h2>회원가입</h2>
      <LoginInput id="joinEmail" type="email" placeholder="이메일" :value="joinEmail" :handler="join" />
      <LoginInput id="joinPassword" type="password" placeholder="비밀번호" :value="joinPassword" :handler="join" />
      <LoginInput id="joinNickname" type="text" placeholder="닉네임" :value="joinNickname" :handler="join" />
      <Button type="submit" width="72px" height="36px" color="white" :background-color="MAIN_BLUE" :sort-center="true">
        회원가입
      </Button>
      <!-- 위 버튼 submit type으로 변경 후 form에 submit 달기 -->
    </form>
  </Modal>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import { PALETTE } from "../../palette.js";
import DropBox from "./Subs/DropBox/DropBox.vue";
import LoginInput from "./Subs/LoginInput/LoginInput.vue";
import Button from "../BaseButton/BaseButton.vue";
import Modal from "../BaseModal/BaseModal.vue";
import SearchInput from "../TheSearchInput/TheSearchInput.vue";
import { requestJoin, checkEmail } from "../../api/account/index.js";

const { MAIN_BLUE, MAIN_GRAY } = PALETTE;
const searchValue = ref("");

const viewStateBasket = reactive({ dropBox: false, login: false, join: false });

const loginValues = reactive({ loginEmail: "", loginPassword: "" });
const joinValues = reactive({ joinEmail: "", joinPassword: "", joinNickname: "" });
const { loginEmail, loginPassword } = toRefs(loginValues);
const { joinEmail, joinPassword, joinNickname } = toRefs(joinValues);

const { dropBox, loginModal, joinModal } = {
  dropBox() {
    viewStateBasket.dropBox = !viewStateBasket.dropBox;
  },
  loginModal() {
    viewStateBasket.login = !viewStateBasket.login;
  },
  joinModal() {
    viewStateBasket.join = !viewStateBasket.join;
  }
};

const { search, login, join } = {
  search(e) {
    searchValue.value = e.target.value;
  },
  login(e) {
    loginValues[e.target.id] = e.target.value;
  },
  join(e) {
    joinValues[e.target.id] = e.target.value;
    if (e.target.id == "joinEmail" && joinValues.joinEmail) {
      handleCheckEmail();
    }
  }
};

const handleRequestJoin = async () => {
  await requestJoin({ email: joinEmail.value, password: joinPassword.value, nickname: joinNickname.value }).then(
    (res) => {
      console.log("JOIN :", res.data);
      res.data;
    }
  );
};

let timer = null;
const handleCheckEmail = () => {
  if (timer) clearTimeout(timer);

  timer = setTimeout(async () => {
    if (joinEmail.value) {
      await checkEmail(joinEmail.value).then((res) => {
        console.log("CHECK EMAIL :", res.data);
      });
    }
  }, 500);
};
</script>

<style lang="scss">
@import "./TheHeader.scss";
</style>
