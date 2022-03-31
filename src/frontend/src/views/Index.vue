<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <builder-dough-selector
          :dough="pizza.dough"
          :selectedDough="order.dough"
          @doughSelected="order.dough = $event"
        />

        <builder-size-selector
          :sizes="pizza.sizes"
          :selectedSize="order.size"
          @sizeSelected="order.size = $event"
        />

        <builder-ingredients-selector
          :ingredients="pizza.ingredients"
          :selectedIngredients="order.selectedIngredients"
          :maxIngredientsCount="maxIngredientsCount"
          :sauces="pizza.sauces"
          :selectedSauce="order.sauce"
          @sauceSelected="order.sauce = $event"
          @changeIngredientCount="changeIngredientCount"
        />

        <builder-pizza-view
          @droppedItem="changeIngredientCount($event)"
          :ingredients="pizza.ingredients"
          :selectedIngredients="order.selectedIngredients"
          :sauce="order.sauce"
          :size="order.size"
          :dough="order.dough"
          v-model="pizzaName"
        >
          <builder-price-counter
            :price="totalPrice || 0"
            :pizzaHasName="pizzaHasName"
            :pizzaHasIngredients="pizzaHasIngredients"
          />
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
  name: "Index",
  data() {
    return {
      misc,
      pizza,
      user,
      maxIngredientsCount: 3,
      pizzaName: null,
      order: {
        selectedIngredients: {},
        size: {},
        dough: {},
        sauce: {},
      },
    };
  },
  computed: {
    // Считаю итоговую цену, учитывая все параметры пиццы
    totalPrice() {
      let total = 0;
      // Стоимость теста
      total = this.order.sauce.price + this.order.dough.price;
      // Стоимость ингредиентов
      Object.keys(this.order.selectedIngredients).forEach((id) => {
        total +=
          this.pizza.ingredients[id].price * this.order.selectedIngredients[id];
      });
      // Возвращаю с учетом множителя размера пиццы
      return this.order.size.multiplier != 0
        ? total * this.order.size.multiplier
        : total;
    },
    pizzaHasName() {
      return !!this.pizzaName;
    },
    pizzaHasIngredients() {
      return Object.values(this.order.selectedIngredients).some(
        (value) => value != 0
      );
    },
  },
  methods: {
    // Изменение количества ингредиентов по любому виду ввода
    changeIngredientCount({ id, count }) {
      this.$set(
        this.order.selectedIngredients,
        id,
        count <= this.maxIngredientsCount ? count : this.maxIngredientsCount
      );
    },
  },
  mounted() {
    this.order.size = this.pizza.sizes[0];
    this.order.dough = this.pizza.dough[0];
    this.order.sauce = this.pizza.sauces[0];
  },
};
</script>
<style></style>
