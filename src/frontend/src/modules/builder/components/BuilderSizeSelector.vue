<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <radio-button
          v-for="size in sizes"
          :key="'size-' + size.id"
          :class="['diameter__input', 'diameter__input--' + getPizzaSize(size)]"
          hidden
          :value="size.multiplier"
          name="diametr"
          :checked="size === selectedSize"
          @selectValue="updateSelectedSize(size)"
        >
          <span>{{ size.name }}</span>
        </radio-button>
      </div>
    </div>
  </div>
</template>
<script>
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "SizeSelector",
  props: {
    // Про валидацию знаю, но если честно не понимаю что тут валидировать
    sizes: {
      type: Array,
      required: true,
    },
    selectedSize: {
      type: Object,
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
    // Передаю выше выбранный размер пиццы
    updateSelectedSize(size) {
      this.$emit("sizeSelected", size);
    },
  },
};
</script>
<style></style>
