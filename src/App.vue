<script setup lang="ts">
import Header from './components/Header.vue';
import CardList from './components/CardList.vue';
import Drawer from './components/Drawer/Drawer.vue';
import { computed, onMounted, provide, ref, watch } from 'vue';
import axios from 'axios';

export type ItemsType = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  isAdded: boolean;
  favoriteId: string;
};

const items = ref<ItemsType[]>([]);
const cart = ref<ItemsType[]>([]);
const drawerOpen = ref(false);
const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price, 0);
});
const filters = ref({
  sortBy: 'title',
  searchQuery: '',
});

const onChangeSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement;

  filters.value.sortBy = target.value;
};

const onDrawerOpen = () => {
  drawerOpen.value = !drawerOpen.value;
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

const onCklickAddPlus = (item: ItemsType) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

const removeFromCart = (item: ItemsType) => {
  cart.value = cart.value.filter((c) => c.id !== item.id);
  item.isAdded = false;
};

const addToCart = (item: ItemsType) => {
  cart.value.push(item);
  item.isAdded = true;
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
});

watch(filters.value, fetchItems);

provide('actions', { addToFavorite, onCklickAddPlus, removeFromCart });
</script>

<template>
  <Drawer v-if="drawerOpen" @on-drawer-open="onDrawerOpen" :cart="cart" :total-price="totalPrice" />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14 mb-14">
    <Header @onDrawerOpen="onDrawerOpen" :total-price="totalPrice" />
    <div class="p-10">
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
    </div>
  </div>
</template>

<style scoped></style>
