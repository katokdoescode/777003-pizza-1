<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="changeCount(false)"
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
      @click="changeCount(true)"
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
      validate: (v) => v.id !== null,
    },
  },
  methods: {
    changeCount(e) {
      if (e === true) {
        this.$emit("changeCount", e);
      } else if (e === false) {
        this.$emit("changeCount", e);
      } else {
        this.$emit("changeCount", {
          id: this.item.id,
          count: Number(e.target.value),
          price: Number(this.item.price),
          image: this.item.image,
        });
      }
    },
  },
};
</script>
