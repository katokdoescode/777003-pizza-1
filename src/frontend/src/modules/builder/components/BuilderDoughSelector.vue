<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <radio-button
          v-for="doughItem in dough"
          :key="'dough-' + doughItem.id"
          :radioBtnValue="doughItem.name"
          :class="['dough__input', getDoughSize(dough)]"
          :radioBtnClass="['visually-hidden']"
          radioBtnName="dought"
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
  },
};
</script>
<style></style>
