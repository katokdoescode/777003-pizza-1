<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <builder-dough-selector
          :dough="pizza.dough"
          @doughSelected="order.doughPrice = $event"
        />

        <builder-size-selector
          :sizes="pizza.sizes"
          @sizeSelected="order.sizeMultiplier = $event"
        />

        <builder-ingredients-selector
          :ingredients="order.selectedIngredients"
          :sauces="pizza.sauces"
          :selectedIngredients="order.selectedIngredients"
          @sauceSelected="order.saucePrice = $event"
          @changeIngredientCount="changeIngredientCount"
        />

        <builder-pizza-view
          @droppedItem="changeIngredientCount(true, $event)"
          :ingredients="order.selectedIngredients"
        >
          <builder-price-counter :price="totalPrice" />
        </builder-pizza-view>
      </div>
    </form>
  </main>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";

export default {
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  name: "Constructor",
  data() {
    return {
      misc,
      pizza,
      user,
      order: {
        saucePrice: 0,
        doughPrice: 0,
        selectedIngredients: [],
        sizeMultiplier: 0,
      },
    };
  },
  computed: {
    // Считаю итоговую цену, учитывая все параметры пиццы
    totalPrice() {
      let total = 0;
      total = this.order.saucePrice + this.order.doughPrice;
      if (this.order.selectedIngredients.length > 0) {
        this.order.selectedIngredients.forEach((ingredient) => {
          total += ingredient.price * ingredient.count;
        });
      }
      return this.order.sizeMultiplier != 0
        ? total * this.order.sizeMultiplier
        : total;
    },
  },
  methods: {
    // Изменение количества ингредиентов по любому виду ввода
    changeIngredientCount(data, id) {
      this.order.selectedIngredients.forEach((ingredient) => {
        if (typeof data === "boolean") {
          if (ingredient.id === id && data === true)
            ingredient.count != 3 ? ingredient.count++ : false;
          if (ingredient.id === id && data === false)
            ingredient.count != 0 ? ingredient.count-- : false;
        } else if (typeof data === "object") {
          // BUG: Input не обновляется если число больше 30, но данные сохраняются верно
          if (ingredient.id === id)
            ingredient.count =
              data.count > 3 || data.count < 0 ? 3 : data.count;
        }
      });
    },
  },
  mounted() {
    // Буду считать количество каждого ингредиента в общем массиве
    this.order.selectedIngredients = this.pizza.ingredients.map(
      (ingredient) => {
        return {
          ...ingredient,
          count: 0,
        };
      }
    );
  },
};
</script>
<style></style>
