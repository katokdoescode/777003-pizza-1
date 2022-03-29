<template>
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
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "SauceSelector",
  components: {
    RadioButton,
  },
  props: {
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
  methods: {
    updateSelectedSauce(sauce) {
      this.$emit("sauceSelected", sauce);
    },
  },
};
</script>

<style></style>
