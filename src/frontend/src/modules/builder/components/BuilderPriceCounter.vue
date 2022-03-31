<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="submit"
      class="button"
      :disabled="price <= 0 || !pizzaHasName"
    >
      Готовьте!
    </button>
  </div>
</template>
<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    price: {
      type: Number,
      default: 0,
    },
    pizzaHasName: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style></style>
