<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <radio-button
          v-for="doughItem in dough"
          :key="'dough-' + doughItem.id"
          :value="doughItem.price"
          :class="['dough__input', getDoughSize(dough)]"
          hidden
          :checked="doughItem === selectedDough"
          name="dought"
          @selectValue="updateSelectedDoughPrice(doughItem)"
        >
          <b>{{ doughItem.name }}</b>
          <span>{{ doughItem.description }}</span>
        </radio-button>
      </div>
    </div>
  </div>
</template>
<script>
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "BuilderDoughSelector",
  props: {
    dough: {
      type: Array,
      required: true,
      validate: (v) => v.name !== null,
    },
    selectedDough: {
      type: Object,
      required: true,
      validate: (v) => v.name !== null,
    },
  },
  components: { RadioButton },
  methods: {
    getDoughSize(dough) {
      return "dough__input--" + (dough.name === "Тонкое" ? "light" : "large");
    },
    updateSelectedDoughPrice(price) {
      this.$emit("doughSelected", price);
    },
  },
};
</script>
<style></style>
