<template>
  <!--
    Не очень понимаю, зачем делать именно этот лэйаут пока.
    Почему нельзя в App.vue подключить компонент Header и потом секцию router-view для контента?
    (тем самым избавиться от лишнего, избыточного <div>)

    Сама идея лэйаутов понятно, но как переключаться между ними тогда?
  -->
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
