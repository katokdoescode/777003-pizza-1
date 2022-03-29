<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <sauce-selector
          :sauces="sauces"
          :selectedSauce="selectedSauce"
          @sauceSelected="$emit('sauceSelected', $event)"
        />
        <pizza-filling
          :ingredients="ingredients"
          :selectedIngredients="selectedIngredients"
          @changeCount="$emit('changeIngredientCount', $event)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import SauceSelector from "@/common/components/SauceSelector.vue";
import PizzaFilling from "@/common/components/PizzaFilling.vue";

export default {
  name: "BuilderIngredientsSelector",
  props: {
    ingredients: {
      type: Array,
      required: true,
      validate: (v) => v.id !== null,
    },
    selectedIngredients: {
      type: Object,
      required: true,
      validate: (v) => v != null,
    },
    maxIngredientsCount: {
      type: Number,
      default: 3,
      validate: (v) => v >= 0,
    },
    sauces: {
      type: Array,
      required: true,
      validate: (v) => v.id !== null,
    },
    selectedSauce: {
      type: Object,
      required: true,
      validate: (v) => v.id !== null,
    },
  },
  components: { SauceSelector, PizzaFilling },
};
</script>
