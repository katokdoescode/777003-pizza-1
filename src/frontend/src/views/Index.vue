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
          :ingredients="pizza.ingredients"
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
        selectedIngredients: {},
        sizeMultiplier: 0,
      },
    };
  },
  computed: {
    // Считаю итоговую цену, учитывая все параметры пиццы
    totalPrice() {
      let total = 0;
      total = this.order.saucePrice + this.order.doughPrice;
      if (this.order.selectedIngredients) {
        Object.values(this.order.selectedIngredients).forEach((ingredient) => {
          total += ingredient.price * ingredient.count;
        });
      }
      return this.order.sizeMultiplier != 0
        ? total * this.order.sizeMultiplier
        : total;
    },
  },
  // Перенес методы для посчета ингредиентов из компонента билдера в основной компонент
  methods: {
    // Изменение количества ингредиентов через input text
    changeIngredientCount(data, id) {
      console.log(data, id);
      if (data === true) {
        if (this.order.selectedIngredients.id === id) {
          this.order.selectedIngredients.filter(
            (ingredient) => ingredient.id === id
          ).count++;
        } else {
          this.$set(this.order.selectedIngredients, id, {
            price: this.pizza.ingredients.filter(
              (ingredient) => ingredient.id === id
            )[0].price,
            count: 1,
            image: this.pizza.ingredients.filter(
              (ingredient) => ingredient.id === id
            )[0].image,
          });
        }
      } else if (data === false) {
        if (this.order.selectedIngredients.id === id) {
          this.order.selectedIngredients.filter(
            (ingredient) => ingredient.id === id
          ).count--;
        } else {
          this.$set(this.order.selectedIngredients, id, {
            price: this.pizza.ingredients.filter(
              (ingredient) => ingredient.id === id
            )[0].price,
            count: 0,
            image: this.pizza.ingredients.filter(
              (ingredient) => ingredient.id === id
            )[0].image,
          });
        }
      } else {
        this.$set(this.order.selectedIngredients, id, {
          price: data.price,
          count: data.value,
          image: data.image,
        });
      }
    },
  },
};
</script>
<style></style>
