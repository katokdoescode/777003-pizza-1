<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button type="submit" class="button" :disabled="!hasNameAndIngredients">
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
    pizzaHasIngredients: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasNameAndIngredients() {
      return this.pizzaHasIngredients && this.pizzaHasName;
    },
  },
};
</script>
<style></style>
