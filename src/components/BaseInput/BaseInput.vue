<template>
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="(e) => handleOnChange(e)"
    :required="required"
    :maxlength="maxlength"
    autocomplete="off"
  />
</template>
<script setup>
import { toRefs } from "vue";

const props = defineProps({
  id: { type: String, required: true },
  type: { type: String, required: true },
  placeholder: { type: String, required: false },
  value: { type: String, required: true },
  required: { type: Boolean, required: false },
  maxlength: { type: Number, required: false }
});

const emit = defineEmits(["handle-change"]);

const { id, placeholder, type, value, required } = toRefs(props);
const handleOnChange = (e) => {
  emit("handle-change", e);
};
</script>
<style lang="scss">
@import "./BaseInput.scss";
</style>
