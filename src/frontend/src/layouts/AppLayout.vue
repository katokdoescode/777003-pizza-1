<template>
  <div id="app-layout">
    <header-layout />
    <router-view />
  </div>
</template>
<script>
import HeaderLayout from "@/layouts/HeaderLayout.vue";
export default {
  name: "AppLayout",
  components: { HeaderLayout },
};
</script>
<style></style>
