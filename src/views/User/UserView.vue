<template>
  <main id="user-view-wrapper">
    <section class="user-info-container">
      {{ route.params.userId }}
      <div class="about-email-check">
        {{ route.params.userId }}
      </div>
    </section>
  </main>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

console.log(`route.params.userId :`, route.params.userId);
</script>
<style lang="scss">
@import "./UserView.scss";
</style>
