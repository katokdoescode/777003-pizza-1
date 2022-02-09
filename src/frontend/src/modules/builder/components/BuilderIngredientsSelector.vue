<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            class="radio ingredients__input"
            v-for="(sauce, key) in sauces"
            :key="'sauce-' + key"
          >
            <input type="radio" name="sauce" :value="sauce.name" />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              class="ingredients__item"
              v-for="ingredient in ingredients"
              :key="'ingredient-' + ingredient.id"
            >
              <span class="filling" :class="getIngredientClass(ingredient)">
                {{ ingredient.name }}
              </span>
              <item-counter
                :count="
                  ingredientsCount[ingredient.id]
                    ? ingredientsCount[ingredient.id]
                    : 0
                "
                :id="ingredient.id"
                @counterPlus="addIngredient(ingredient.id)"
                @counterMinus="removeIngredient(ingredient.id)"
                @changeCount="changeIngredientCount"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemCounter from "@/common/components/ItemCounter.vue";
export default {
  name: "IngredientsSelector",
  data() {
    return {
      ingredientsCount: {},
    };
  },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
  },
  components: {
    ItemCounter,
  },
  methods: {
    getIngredientClass(ingredient) {
      const imagePath = ingredient.image.split("/");
      return imagePath[3] + "--" + imagePath[4].slice(0, -4);
    },
    changeIngredientCount(data) {
      this.$set(this.ingredientsCount, data.id, data.value);
    },
    // Есть смысл обернуть эти два метода в один, и передавать просто дополнительынй параметр?
    addIngredient(ingredientId) {
      if (this.ingredientsCount[ingredientId]) {
        this.ingredientsCount[ingredientId]++;
      } else {
        this.$set(this.ingredientsCount, ingredientId, 1);
      }
    },
    removeIngredient(ingredientId) {
      if (this.ingredientsCount[ingredientId]) {
        this.ingredientsCount[ingredientId]--;
      } else {
        this.$set(this.ingredientsCount, ingredientId, 0);
      }
    },
  },
};
</script>
<style></style>
