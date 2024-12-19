<template>
  <CardList :items="favorites" />
</template>

<script setup lang="ts">
import axios from 'axios';
import { inject, onMounted, provide, Ref, ref, watch } from 'vue';
import { ItemsType } from '../App.vue';
import CardList from '../components/Cards/CardList.vue';

const action = inject<{ cart: Ref<ItemsType[]>; removeFromCart: (item: ItemsType) => void }>(
  'cart'
);

const favorites = ref<ItemsType[]>([]);

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://43cace301b44f096.mokky.dev/favorite?_relations=items`
    );
    favorites.value = data.map((d: any) => ({
      ...d.item,
      isFavorite: d.isFavorite,
      id: d.item.id,
      parentId: d.id,
      isAdded: true,
    }));
  } catch (error) {
    console.error(error);
  }

  if (action)
    favorites.value = favorites.value.map((i) => ({
      ...i,
      isAdded: action?.cart.value.some((c) => c.id === i.id),
    }));
});

const addToFavorite = async (item: ItemsType) => {
  try {
    await axios.delete(`https://43cace301b44f096.mokky.dev/favorite/${item.parentId}`);
    favorites.value = favorites.value.filter((f) => f.id !== item.id);
  } catch (error) {
    console.error(error);
  }
};

action?.cart &&
  watch(
    action?.cart,
    () => {
      if (action)
        favorites.value = favorites.value.map((i) => ({
          ...i,
          isAdded: action?.cart.value.some((c) => c.id === i.id),
        }));
    },
    { deep: true }
  );

provide('actions', { addToFavorite });
</script>

<style scoped></style>
