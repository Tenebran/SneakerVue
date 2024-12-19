<template>
  <div class="min-h-[60vh]">
    <div class="flex space-x-2 items-center justify-center min-h-[50vh]" v-if="loadingFavofites">
      <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
      <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
      <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
    </div>

    <InfoBlock
      v-if="!favorites.length && !loadingFavofites"
      img-url="/package-icon.png"
      title="У вас нет закладок"
      description="Добавьте хотя  бы одну пару кросовок в закладки" />
    <CardList :items="favorites" v-else />
  </div>
</template>

<script setup lang="ts">
import InfoBlock from '../components/infoBlock/InfoBlcok.vue';
import axios from 'axios';
import { inject, onMounted, provide, Ref, ref, watch } from 'vue';
import { ItemsType } from '../App.vue';
import CardList from '../components/Cards/CardList.vue';

const action = inject<{ cart: Ref<ItemsType[]>; removeFromCart: (item: ItemsType) => void }>(
  'cart'
);

const favorites = ref<ItemsType[]>([]);
const loadingFavofites = ref<boolean>(false);
onMounted(async () => {
  loadingFavofites.value = true;
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
  } finally {
    loadingFavofites.value = false;
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
