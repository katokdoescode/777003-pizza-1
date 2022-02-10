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
    item: {
      type: Object,
      required: true,
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
        id: this.item.id,
        price: Number(this.item.price),
        image: this.item.image,
      });
    },
  },
};
</script>
