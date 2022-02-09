<template>
  <label>
    <input
      type="radio"
      :name="radioBtnName"
      :value="radioBtnValue"
      :class="radioBtnClass"
    />
    <slot></slot>
  </label>
</template>
<script>
export default {
  name: "RadioButton",
  props: {
    radioBtnClass: {
      type: Array,
      required: false,
    },
    radioBtnName: {
      type: String,
      required: true,
    },
    radioBtnValue: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>
<style></style>
