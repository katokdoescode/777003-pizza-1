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
              <drag-wrapper :transfer-data="ingredient">
                <span class="filling" :class="getIngredientClass(ingredient)">
                  {{ ingredient.name }}
                </span>
              </drag-wrapper>
              <item-counter
                :item="ingredient"
                :count="ingredientCount(ingredient)"
                @counterPlus="$emit('addIngredient', ingredient.id)"
                @counterMinus="$emit('removeIngredient', ingredient.id)"
                @changeCount="$emit('changeIngredientCount', $event)"
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
import DragWrapper from "@/common/components/DragWrapper.vue";
export default {
  name: "IngredientsSelector",
  data() {
    return {
      selectedSaucePrice: null,
    };
  },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    selectedIngredients: {
      type: Object,
      required: false,
    },
    sauces: {
      type: Array,
      required: true,
    },
  },
  components: {
    ItemCounter,
    RadioButton,
    DragWrapper,
  },
  methods: {
    ingredientCount(ingredient) {
      return this.selectedIngredients[ingredient.id]
        ? this.selectedIngredients[ingredient.id].count
        : 0;
    },
    getIngredientClass(ingredient) {
      const imagePath = ingredient.image.split("/");
      return imagePath[3] + "--" + imagePath[4].slice(0, -4);
    },
    // Сохраняю и передаю в родительский компонент цену выбранного соуса
    updateSelectedSauce(price) {
      this.selectedSaucePrice = price;
      this.$emit("sauceSelected", this.selectedSaucePrice);
    },
  },
};
</script>
<style></style>
