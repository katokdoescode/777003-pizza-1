<template>
  <label>
    <input
      type="radio"
      :name="name"
      :value="value"
      :class="[{ 'visually-hidden': hidden }]"
      @input="selectValue"
    />
    <slot></slot>
  </label>
</template>
<script>
export default {
  name: "RadioButton",
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    selectValue(e) {
      this.$emit("selectValue", Number(e.target.value));
    },
  },
};
</script>
<style></style>
