<script setup lang="ts">
import Header from './components/Header.vue';
import CardList from './components/CardList.vue';
import Drawer from './components/Drawer/Drawer.vue';
</script>

<template>
  <!-- <Drawer /> -->
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14 mb-14">
    <Header />
    <div class="p-10">
      <h2 class="text-3xl font-bold mb-8">Все кросовки</h2>
      <CardList />
    </div>
  </div>
</template>

<style scoped></style>
