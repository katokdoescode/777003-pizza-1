<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <radio-button
          v-for="doughItem in dough"
          :key="'dough-' + doughItem.id"
          :radioBtnValue="doughItem.price"
          :class="['dough__input', getDoughSize(dough)]"
          :radioBtnClass="['visually-hidden']"
          radioBtnName="dought"
          @selectValue="updateSelectedDoughPrice"
        >
          <template v-slot>
            <b>{{ doughItem.name }}</b>
            <span>{{ doughItem.description }}</span>
          </template>
        </radio-button>
      </div>
    </div>
  </div>
</template>
<script>
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "DoughSelector",
  data() {
    return {
      selectedDoughPrice: null,
    };
  },
  props: {
    dough: {
      type: Array,
      required: true,
    },
  },
  components: { RadioButton },
  methods: {
    getDoughSize(dough) {
      return "dough__input--" + (dough.name == "Тонкое" ? "light" : "large");
    },
    // Сохраняю и передаю выше цену выбранного теста
    updateSelectedDoughPrice(price) {
      this.selectedDoughPrice = price;
      this.$emit("doughSelected", this.selectedDoughPrice);
    },
  },
};
</script>
<style></style>
