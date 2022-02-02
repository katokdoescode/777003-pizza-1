<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          class="diameter__input"
          :class="'diameter__input--' + getPizzaSize(size)"
          v-for="(size, key) in sizes"
          :key="'size-' + key"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.multiplier"
            class="visually-hidden"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SizeSelector",
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
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
  },
};
</script>
<style></style>
