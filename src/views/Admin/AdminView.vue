<template>
  <main class="admin-page-wrapper">
    <form>
      <Transition name="nested">
        <div class="form-container">
          <section class="inner">
            <h2>셀렉트 뷰</h2>
            <div>
              <BaseInputVue id="title" type="text" />
            </div>
            <div>
              <textarea id="content"></textarea>
            </div>
            <div>
              <BaseInputVue id="address" type="text" />
            </div>
            <div>
              <BaseInputVue id="tel" type="tel" />
            </div>
          </section>
          <section class="inner">
            <h2>인풋 뷰</h2>
            <div>
              <BaseInputVue id="title" type="text" />
            </div>
            <div>
              <textarea id="content"></textarea>
            </div>
            <div>
              <BaseInputVue id="address" type="text" />
            </div>
            <div>
              <BaseInputVue id="tel" type="tel" />
            </div>
          </section>
        </div>
      </Transition>
      <button type="button" @click="handleVisibles">이전</button>
      <button type="button" @click="handleVisibles">다음</button>
    </form>
  </main>
</template>

<script setup>
import { reactive, Transition } from "vue";
import BaseInputVue from "../../components/BaseInput/BaseInput.vue";

const visibles = reactive({ curIndex: 0, views: [true, false] });

const values = reactive({ title: "", content: "", address: "", tel: "" });

const handleVisibles = (flag) => {
  visibles.views[visibles.curIndex] = !visibles.views[visibles.curIndex];
  visibles.curIndex = visibles.curIndex + flag;
  visibles.views[visibles.curIndex] = !visibles.views[visibles.curIndex];
};

const DUMMY = {
  contentId: "int",
  contentTypeId: "int",
  sidoCode: "int",
  gugunCode: "int",
  title: "string",
  address: "string",
  tel: "string"
  // zipcode: "string",
  // latitude: "double",
  // longitude: "double",
  // mlevel: ""
};
</script>

<style lang="scss">
@import "./AdminView.scss";
</style>
