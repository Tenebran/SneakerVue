<template>
  <div class="grid grid-cols-4 gap-5 mt-10">
    <Card
      v-for="item in items"
      :key="item.id"
      :img-url="item.imageUrl"
      :title="item.title"
      :is-added="true"
      :is-favorite="true"
      v-on:clickAdd="onClickAdd"
      v-on:clickFavorite="onClickFavorite"
      :price="item.price" />
  </div>
</template>

<script setup lang="ts">
import { ItemsType } from '../App.vue';
import Card from './Card.vue';

defineProps<{
  items: ItemsType;
}>();

const onClickAdd = () => {
  alert('Hello ADD');
};
const onClickFavorite = () => {
  alert('Hello Favorite');
};
</script>

<style scoped></style>
