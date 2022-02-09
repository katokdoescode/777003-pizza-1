<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <builder-dough-selector
          :dough="pizza.dough"
          @doughSelected="selectedPizzaParameters.doughPrice = $event"
        />

        <builder-size-selector
          :sizes="pizza.sizes"
          @sizeSelected="selectedPizzaParameters.sizeMultiplier = $event"
        />

        <builder-ingredients-selector
          :ingredients="pizza.ingredients"
          :sauces="pizza.sauces"
          @ingredientsChanged="
            selectedPizzaParameters.selectedIngredients = $event
          "
          @sauceSelected="selectedPizzaParameters.saucePrice = $event"
        />

        <builder-pizza-view>
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
      selectedPizzaParameters: {
        saucePrice: 0,
        doughPrice: 0,
        selectedIngredients: {},
        sizeMultiplier: 0,
      },
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      total =
        this.selectedPizzaParameters.saucePrice +
        this.selectedPizzaParameters.doughPrice;
      if (this.selectedPizzaParameters.selectedIngredients) {
        Object.values(this.selectedPizzaParameters.selectedIngredients).forEach(
          (ingredient) => {
            total += ingredient.price * ingredient.count;
          }
        );
      }
      return this.selectedPizzaParameters.sizeMultiplier != 0
        ? total * this.selectedPizzaParameters.sizeMultiplier
        : total;
    },
  },
};
</script>
<style></style>
