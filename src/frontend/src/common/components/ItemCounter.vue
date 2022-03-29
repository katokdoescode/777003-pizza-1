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
      :disabled="count >= max"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "ItemCounter",
  model: {
    prop: "count",
    event: "changeCount",
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 3,
    },
    id: {
      type: [Number, String],
      validate: (v) => v != null && v != undefined && v != "",
    },
  },
  methods: {
    changeCount(value) {
      this.$emit("changeCount", {
        id: this.id,
        count: Number(value) <= this.max ? Number(value) : this.max,
      });
    },
  },
};
</script>
