<template>
  <div class="grid grid-cols-4 gap-5 mt-10">
    <Card
      v-for="item in items"
      :key="item.id"
      :img-url="item.imageUrl"
      :title="item.title"
      :is-added="true"
      :is-favorite="item.isFavorite"
      v-on:clickAdd="onClickAdd"
      :item="item"
      :price="item.price" />
  </div>
</template>

<script setup lang="ts">
import { ItemsType } from '../App.vue';
import Card from './Card.vue';

defineProps<{
  items: ItemsType[];
}>();

const onClickAdd = () => {
  alert('Hello ADD');
};
</script>

<style scoped></style>
