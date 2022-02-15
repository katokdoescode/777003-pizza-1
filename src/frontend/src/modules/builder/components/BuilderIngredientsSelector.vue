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
            name="sauce"
            :value="sauce.price"
            @selectValue="updateSelectedSauce"
          >
            <span>{{ sauce.name }}</span>
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
                :count="ingredient.count"
                @changeCount="
                  $emit('changeIngredientCount', $event, ingredient.id)
                "
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
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    selectedIngredients: {
      // Only one in future!
      type: [Array, Object],
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
    getIngredientClass(ingredient) {
      const imagePath = ingredient.image.split("/");
      return imagePath[3] + "--" + imagePath[4].slice(0, -4);
    },
    // Передаю в родительский компонент цену выбранного соуса
    updateSelectedSauce(price) {
      this.$emit("sauceSelected", price);
    },
  },
};
</script>
<style></style>
