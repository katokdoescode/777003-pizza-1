<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <!-- Убрать в отдельный компонент -->
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <radio-button
            v-for="sauce in sauces"
            :key="'sauce-' + sauce.id"
            :class="['radio', 'ingredients__input']"
            name="sauce"
            :checked="sauce === selectedSauce"
            :value="sauce.price"
            @selectValue="updateSelectedSauce(sauce)"
          >
            <span>{{ sauce.name }}</span>
          </radio-button>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">
            <!-- Убрать в отдельный компонент -->
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
                :count.sync="selectedIngredients[ingredient.id]"
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
