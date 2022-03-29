<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>
    <drop-area class="content__constructor" @drop="onItemDrop">
      <div :class="['pizza', pizzaClass]">
        <div class="pizza__wrapper">
          <div
            class="pizza__filling"
            v-for="(ingredient, key) in ingredientsList"
            :key="
              'on-pizza-ingredient-' + getIngredientName(ingredient) + '-' + key
            "
            :class="[
              'pizza__filling--' + getIngredientName(ingredient),
              ingredient.class,
            ]"
          ></div>
        </div>
      </div>
    </drop-area>
    <slot />
  </div>
</template>
<script>
import DropArea from "@/common/components/DropArea.vue";
export default {
  name: "BuilderIngredientsSelector",
  components: { DropArea },
  props: {
    ingredients: {
      type: [Array, Object],
      required: false,
      validate: (v) => v.id !== null,
    },
    selectedIngredients: {
      type: Object,
      required: true,
      validate: (v) => v != null,
    },
    sauce: {
      type: Object,
      required: true,
      validate: (v) => v.name !== null,
    },
    dough: {
      type: Object,
      required: true,
      validate: (v) => v.name !== null,
    },
  },
  computed: {
    // Добавляю второму и третьему ингредиенту класс
    ingredientsList() {
      const ingredients = [];
      this.ingredients.forEach((ingredient) => {
        for (let i = 1; i <= this.selectedIngredients[ingredient.id]; i++) {
          ingredients.push({
            ...ingredient,
            class:
              i === 2
                ? "pizza__filling--second"
                : i === 3
                ? "pizza__filling--third"
                : null,
          });
        }
      });
      return ingredients;
    },
    pizzaClass() {
      let baseClass =
        "pizza--foundation--" +
        (this.dough.name === "Тонкое" ? "small" : "big") +
        "-" +
        (this.sauce.name === "Томатный" ? "tomato" : "creamy");
      return baseClass;
    },
  },
  methods: {
    onItemDrop({ id }) {
      this.$emit("droppedItem", {
        id: id,
        count: this.selectedIngredients[id]
          ? this.selectedIngredients[id] + 1
          : 1,
      });
    },
    getIngredientName(ingredient) {
      const imagePath = ingredient.image.split("/");
      return imagePath[4].slice(0, -4);
    },
  },
};
</script>
<style></style>
