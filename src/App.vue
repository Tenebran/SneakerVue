<script setup lang="ts">
import Header from './components/Header/Header.vue';
import Drawer from './components/Drawer/Drawer.vue';
import { computed, onMounted, provide, ref, watch } from 'vue';
import Home from './page/Home.vue';
import axios from 'axios';

export type ItemsType = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  isAdded: boolean;
  favoriteId: string;
  parentId?: number;
};

const localStorageCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : [];
const cart = ref<ItemsType[]>(localStorageCart);
const drawerOpen = ref(false);
const isLoadingOrdner = ref(false);
const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price, 0);
});

const onDrawerOpen = () => {
  drawerOpen.value = !drawerOpen.value;
};

const addToCart = (item: ItemsType) => {
  cart.value.push(item);
  item.isAdded = true;
};

const onCklickAddPlus = (item: ItemsType) => {
  console.log('item', item);
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

const createOrder = async () => {
  try {
    isLoadingOrdner.value = true;
    const { data } = await axios.post(`https://43cace301b44f096.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value,
    });

    cart.value = [];
    items.value = items.value.map((i) => {
      return { ...i, isAdded: false };
    });
    isLoadingOrdner.value = false;

    return data;
  } catch (error) {
    console.log(error);
  }
};

const removeFromCart = (item: ItemsType) => {
  cart.value = cart.value.filter((c) => c.id !== item.id);
  item.isAdded = false;
};

watch(cart, () => localStorage.setItem('cart', JSON.stringify(cart.value)), { deep: true });

provide('cart', { cart, removeFromCart, onCklickAddPlus });
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    @on-drawer-open="onDrawerOpen"
    :cart="cart"
    :total-price="totalPrice"
    :isLoadingOrdner="isLoadingOrdner" />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14 mb-14">
    <Header @onDrawerOpen="onDrawerOpen" :total-price="totalPrice" />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
