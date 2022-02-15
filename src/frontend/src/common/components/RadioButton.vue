<template>
  <label>
    <input
      type="radio"
      :name="name"
      :value="value"
      :class="[{ 'visually-hidden': hidden }]"
      :checked="checked"
      @input="$emit('selectValue', Number($event.target.value))"
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
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style></style>
