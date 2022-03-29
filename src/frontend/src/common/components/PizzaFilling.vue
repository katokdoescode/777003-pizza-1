<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
        class="ingredients__item"
        v-for="ingredient in ingredients"
        :key="'ingredient-' + ingredient.id"
      >
        <drag-wrapper :transfer-data="ingredient">
          <span class="filling" :class="getIngredientClass(ingredient)">
            {{ ingredient.name }}
          </span>
        </drag-wrapper>
        <item-counter
          :item="ingredient"
          :id="ingredient.id"
          :max="maxIngredientsCount"
          v-model="selectedIngredients[ingredient.id]"
          @changeCount="$emit('changeCount', $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter.vue";
import DragWrapper from "@/common/components/DragWrapper.vue";

export default {
  components: { ItemCounter, DragWrapper },
  name: "PizzaFilling",
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
  },
  methods: {
    getIngredientClass(ingredient) {
      const imagePath = ingredient.image.split("/");
      return imagePath[3] + "--" + imagePath[4].slice(0, -4);
    },
  },
};
</script>

<style></style>
