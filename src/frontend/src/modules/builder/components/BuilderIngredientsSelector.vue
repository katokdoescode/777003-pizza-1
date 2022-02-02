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
              v-for="(ingredient, key) in ingredients"
              :key="'ingredient-' + key"
            >
              <span class="filling" :class="getIngredientClass(ingredient)">
                {{ ingredient.name }}
              </span>

              <div class="counter counter--orange ingredients__counter">
                <button
                  type="button"
                  class="counter__button counter__button--minus"
                  disabled
                >
                  <span class="visually-hidden">Меньше</span>
                </button>
                <input
                  type="text"
                  name="counter"
                  class="counter__input"
                  value="0"
                />
                <button
                  type="button"
                  class="counter__button counter__button--plus"
                >
                  <span class="visually-hidden">Больше</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IngreDientsSelector",
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
  methods: {
    getIngredientClass(ingredient) {
      const imagePath = ingredient.image.split("/");
      return imagePath[3] + "--" + imagePath[4].slice(0, -4);
    },
  },
};
</script>
<style></style>
