<template>
  <div class="grid grid-cols-4 gap-5 mt-10 select-none" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :img-url="item.imageUrl"
      :title="item.title"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
      :item="item"
      :price="item.price" />
  </div>
</template>
<script setup lang="ts">
import { ItemsType } from '../../App.vue';
import Card from './Card.vue';

defineProps<{
  items: ItemsType[];
}>();
</script>

<style scoped></style>
