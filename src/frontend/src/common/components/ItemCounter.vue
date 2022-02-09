<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="counterMinus"
      :disabled="count <= 0"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="count"
      @input="changeCount"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="counterPlus"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "ItemCounter",
  props: {
    count: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    counterPlus() {
      this.$emit("counterPlus");
    },
    counterMinus() {
      this.$emit("counterMinus");
    },
    changeCount(e) {
      this.$emit("changeCount", {
        value: Number(e.target.value),
        id: this.id,
        price: Number(this.price),
      });
    },
  },
};
</script>
