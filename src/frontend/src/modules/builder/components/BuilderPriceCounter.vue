<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button type="button" class="button" :disabled="price <= 0">
      Готовьте!
    </button>
  </div>
</template>
<script>
export default {
  name: "PriceCounter",
  props: {
    price: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style></style>
