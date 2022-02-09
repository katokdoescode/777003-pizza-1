<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <radio-button
          v-for="size in sizes"
          :key="'size-' + size.id"
          :class="['diameter__input', 'diameter__input--' + getPizzaSize(size)]"
          :radioBtnClass="['visually-hidden']"
          :radioBtnValue="size.multiplier"
          radioBtnName="diametr"
          @selectValue="updateSelectedSize"
        >
          <template v-slot>
            <span>{{ size.name }}</span>
          </template>
        </radio-button>
      </div>
    </div>
  </div>
</template>
<script>
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "SizeSelector",
  data() {
    return {
      selectedSizeMultiplier: null,
    };
  },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
  components: { RadioButton },
  methods: {
    getPizzaSize(size) {
      switch (size.multiplier) {
        case 1:
          return "small";
        case 2:
          return "normal";
        case 3:
          return "big";
        default:
          break;
      }
    },
    updateSelectedSize(size) {
      this.selectedSizeMultiplier = size;
      this.$emit("sizeSelected", this.selectedSizeMultiplier);
    },
  },
};
</script>
<style></style>
