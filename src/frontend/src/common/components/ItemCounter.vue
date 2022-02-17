<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="changeCount(count - 1)"
      :disabled="count <= 0"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      ref="counterInput"
      type="text"
      name="counter"
      class="counter__input"
      :value="count"
      @input="changeCount($event.target.value)"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="changeCount(count + 1)"
      :disabled="count >= 3"
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
    changeCount(value) {
      this.$emit("changeCount", {
        id: this.item.id,
        count: Number(value),
        price: Number(this.item.price),
        image: this.item.image,
      });
    },
  },
};
</script>
