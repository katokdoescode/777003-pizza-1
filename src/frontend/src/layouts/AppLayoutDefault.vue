<template>
  <div id="app-layout-default">
    <header-layout />
    <router-view />
  </div>
</template>

<script>
import HeaderLayout from "./HeaderLayout.vue";
export default {
  name: "AppLayoutDefault",
  components: { HeaderLayout },
};
</script>

<style></style>
