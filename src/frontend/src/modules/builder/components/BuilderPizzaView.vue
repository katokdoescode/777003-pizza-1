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
    <drop-area
      class="content__constructor"
      @drop="$emit('droppedItem', $event.id)"
    >
      <div class="pizza pizza--foundation--big-tomato">
        <div class="pizza__wrapper">
          <div
            class="pizza__filling"
            v-for="ingredient in onlyCountedIngredients"
            :key="'on-pizza-ingredient-' + getIngredientName(ingredient)"
            :class="'pizza__filling--' + getIngredientName(ingredient)"
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
  name: "PizzaView",
  components: { DropArea },
  props: {
    ingredients: {
      type: Object,
      required: false,
    },
  },
  computed: {
    // Чтобы на пиццу попадали только игредиенты с количеством отличным от нуля
    onlyCountedIngredients() {
      const ingredients = Object.values(this.ingredients);
      return ingredients.filter((ingredient) => ingredient.count != 0);
    },
  },
  methods: {
    getIngredientName(ingredient) {
      const imagePath = ingredient.image.split("/");
      return imagePath[4].slice(0, -4);
    },
  },
};
</script>
<style></style>
