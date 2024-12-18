<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кросовки</h2>
    <div class="flex gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="name">По названию</option>
        <option value="price">По цене (дешевле)</option>
        <option value="-price">По цене (дороже)</option>
      </select>
      <div class="relative">
        <img src="/search.svg" class="absolute top-3 left-3" />
        <input
          @input="onChangeInput"
          :value="filters.searchQuery"
          placeholder="Поиск..."
          class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-green-400" />
      </div>
    </div>
  </div>
  <CardList :items="items" />
</template>

<script setup lang="ts">
import axios from 'axios';
import CardList from '../components/Cards/CardList.vue';
import { ItemsType } from '../App.vue';
import { inject, onMounted, provide, Ref, ref, watch } from 'vue';
const items = ref<ItemsType[]>([]);
const action = inject<{ cart: Ref<ItemsType[]>; removeFromCart: (item: ItemsType) => void }>(
  'cart'
);
const filters = ref({
  sortBy: 'title',
  searchQuery: '',
});

const onChangeSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement;

  filters.value.sortBy = target.value;
};

const onChangeInput = (event: Event) => {
  const target = event.target as HTMLSelectElement;

  filters.value.searchQuery = target.value;
};

const addToFavorite = async (item: ItemsType) => {
  try {
    if (!item.isFavorite) {
      const { data } = await axios.post(`https://43cace301b44f096.mokky.dev/favorite`, {
        parentId: item.id,
      });
      item.favoriteId = data.id;
      item.isFavorite = true;
    } else {
      await axios.delete(`https://43cace301b44f096.mokky.dev/favorite/${item.favoriteId}`);
      item.isFavorite = false;
      item.favoriteId = '';
    }
  } catch (error) {
    console.log(error);
  }
};

const fetcFavorites = async () => {
  try {
    const { data } = await axios.get(`https://43cace301b44f096.mokky.dev/favorite`);
    items.value = items.value.map((item) => {
      const favorite = data.find((f: any) => f.parentId === item.id);
      return favorite ? { ...item, isFavorite: true, favoriteId: favorite.id } : item;
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchItems = async () => {
  try {
    const params: { sortBy: string; title?: string } = {
      sortBy: filters.value.sortBy,
    };

    if (filters.value.searchQuery) {
      params.title = `*${filters.value.searchQuery}*`;
    }
    const { data } = await axios.get(`https://43cace301b44f096.mokky.dev/items`, { params });

    items.value = data.map((item: any) => ({ ...item, isFavorite: false, isAdded: false }));
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await fetchItems(), await fetcFavorites();
  if (action)
    items.value = items.value.map((i) => ({
      ...i,
      isAdded: action?.cart.value.some((c) => c.id === i.id),
    }));
});
const addToCart = (item: ItemsType) => {
  action?.cart.value.push(item);
  item.isAdded = true;
};

const onCklickAddPlus = (item: ItemsType) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    action?.removeFromCart(item);
  }
};
provide('actions', { addToFavorite, onCklickAddPlus });
watch(filters.value, fetchItems);
</script>

<style scoped></style>
