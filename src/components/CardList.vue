<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      img-url="/sneakers/sneakers-1.jpg"
      title="Мужские Кросовки Nike Blazer Mid Suede"
      :is-added="true"
      :is-favorite="true"
      v-on:clickAdd="onClickAdd"
      v-on:clickFavorite="onClickFavorite"
      on
      :price="1200" />
  </div>
</template>

<script setup lang="ts">
import Card from './Card.vue';

const onClickAdd = () => {
  alert('Hello ADD');
};
const onClickFavorite = () => {
  alert('Hello Favorite');
};
</script>

<style scoped></style>
