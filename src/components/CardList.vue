<template>
  <div class="p-10">
    <h2 class="text-3xl font-bold mb-8">Все кросовки</h2>
    <div class="grid grid-cols-4 gap-5">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from './Card.vue';
</script>

<style scoped></style>
