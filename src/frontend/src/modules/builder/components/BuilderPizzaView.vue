<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>
    <drop-area
      class="content__constructor"
      @drop="$emit('droppedItem', $event.id)"
    >
      <div class="pizza pizza--foundation--big-tomato">
        <div class="pizza__wrapper">
          <div class="pizza__filling pizza__filling--ananas"></div>
          <div class="pizza__filling pizza__filling--bacon"></div>
          <div class="pizza__filling pizza__filling--cheddar"></div>
        </div>
      </div>
    </drop-area>
    <slot />
  </div>
</template>
<script>
import DropArea from "@/common/components/DropArea.vue";
export default {
  name: "PizzaView",
  components: { DropArea },
};
</script>
<style></style>
