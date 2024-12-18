<template>
  <div class="border items-center flex border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="cart.imageUrl" />
    <div class="flex flex-col flex-1 justify-between">
      <p>{{ cart.title }}</p>
      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ cart.price }}</b>
        <img
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          @click="actions.removeFromCart(cart)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { ItemsType } from '../../App.vue';

defineProps<{
  cart: ItemsType;
}>();

const actions = inject<{
  removeFromCart: (id: ItemsType) => void;
}>('cart');
</script>

<style scoped></style>
