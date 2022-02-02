<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          class="dough__input"
          :class="getDoughSize(dough)"
          v-for="(doughItem, key) in dough"
          :key="'dough-' + key"
        >
          <input
            type="radio"
            name="dought"
            :value="doughItem.name"
            class="visually-hidden"
          />
          <b>{{ doughItem.name }}</b>
          <span>{{ doughItem.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DoughSelector",
  props: {
    dough: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getDoughSize(dough) {
      return "dough__input--" + (dough.name == "Тонкое" ? "light" : "large");
    },
  },
};
</script>
<style></style>
