<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <radio-button
            v-for="sauce in sauces"
            :key="'sauce-' + sauce.id"
            :class="['radio', 'ingredients__input']"
            radioBtnName="sauce"
            :radioBtnValue="sauce.price"
            @selectValue="updateSelectedSauce"
          >
            <template v-slot>
              <span>{{ sauce.name }}</span>
            </template>
          </radio-button>
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
                    ? ingredientsCount[ingredient.id].count
                    : 0
                "
                :id="ingredient.id"
                :price="ingredient.price"
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
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "IngredientsSelector",
  data() {
    return {
      ingredientsCount: {},
      selectedSaucePrice: null,
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
    RadioButton,
  },
  watch: {
    ingredientsCount: {
      deep: true,
      handler(value) {
        this.$emit("ingredientsChanged", value);
      },
    },
  },
  methods: {
    getIngredientClass(ingredient) {
      const imagePath = ingredient.image.split("/");
      return imagePath[3] + "--" + imagePath[4].slice(0, -4);
    },
    changeIngredientCount(data) {
      this.$set(this.ingredientsCount, data.id, {
        price: data.price,
        count: data.value,
      });
    },
    // Есть смысл обернуть эти два метода в один, и передавать просто дополнительынй параметр?
    addIngredient(ingredientId) {
      if (this.ingredientsCount[ingredientId]) {
        this.ingredientsCount[ingredientId].count++;
      } else {
        this.$set(this.ingredientsCount, ingredientId, {
          price: this.ingredients[ingredientId].price,
          count: 1,
        });
      }
    },
    removeIngredient(ingredientId) {
      if (this.ingredientsCount[ingredientId]) {
        this.ingredientsCount[ingredientId].count--;
      } else {
        this.$set(this.ingredientsCount, ingredientId, {
          price: this.ingredients[ingredientId].price,
          count: 0,
        });
      }
    },
    updateSelectedSauce(price) {
      this.selectedSaucePrice = price;
      this.$emit("sauceSelected", this.selectedSaucePrice);
    },
  },
};
</script>
<style></style>
