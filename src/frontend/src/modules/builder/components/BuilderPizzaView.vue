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
      <div :class="['pizza', pizzaClass]">
        <div class="pizza__wrapper">
          <div
            class="pizza__filling"
            v-for="(ingredient, key) in onlyCountedIngredients"
            :key="'on-pizza-ingredient-' + getIngredientName(ingredient) + key"
            :class="'pizza__filling--' + getIngredientName(ingredient)"
          ></div>
        </div>
      </div>
      <pre>
        {{ onlyCountedIngredients }}
      </pre>
    </drop-area>
    <slot />
  </div>
</template>
<script>
import DropArea from "@/common/components/DropArea.vue";
export default {
  name: "BuilderIngredientsSelector",
  data() {
    return {
      onlyCountedIngredients: [],
    };
  },
  components: { DropArea },
  props: {
    pizzaIngredients: {
      type: [Array, Object],
      required: true,
    },
    ingredients: {
      type: [Array, Object],
      required: false,
    },
    sauce: {
      type: Object,
      required: true,
    },
    size: {
      type: Object,
      required: true,
    },
    dough: {
      type: Object,
      required: true,
    },
  },
  watch: {
    ingredients: {
      immidiate: true,
      deep: true,
      handler() {
        const ingredients = Object.values(this.ingredients);
        const startedIngredients = this.pizzaIngredients;
        for (let i = 0; i < startedIngredients.length; i++) {
          ingredients
            .filter((ingredient) => ingredient.count !== 0)
            .filter((ingredient) => {
              if (ingredient.id === startedIngredients[i].id) {
                const newIngredient = startedIngredients[i];
                newIngredient.index = ingredient.count;
                this.onlyCountedIngredients.push(newIngredient);
              }
            });
        }
      },
    },
  },
  computed: {
    // Чтобы на пиццу попадали только игредиенты с количеством отличным от нуля
    // onlyCountedIngredients() {
    //   const ingredients = Object.values(this.ingredients);
    //   let ingredientsList = [];
    //   for (let i = 0; i < this.pizzaIngredients.length; i++) {
    //     ingredients.filter((ingredient) => {
    //       if (ingredient.id === this.pizzaIngredients[i].id) {
    //         const newIngredient = this.pizzaIngredients[i];
    //         newIngredient.index = 1;
    //         for (let j = 0; j < ingredient.count; j++) {
    //           console.log(j);
    //           newIngredient.index = j + 1;
    //           ingredientsList.push(newIngredient);
    //         }
    //       }
    //     });
    //   }
    //   return ingredientsList;
    // },
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
    getIngredientName(ingredient) {
      const imagePath = ingredient.image.split("/");
      return imagePath[4].slice(0, -4);
    },
  },
};
</script>
<style></style>
