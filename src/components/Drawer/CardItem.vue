<template>
  <div class="border items-center flex border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageCart" />
    <div class="flex flex-col flex-1 justify-between">
      <p>{{ t(`Card.${cart.title}`) }}</p>
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
import { computed, inject } from 'vue';
import { ItemsType } from '../../App.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  cart: ItemsType;
}>();

const imageCart = computed(() => `${import.meta.env.BASE_URL}${props.cart.imageUrl}`);

const actions = inject<{
  removeFromCart: (id: ItemsType) => void;
}>('cart');
</script>

<style scoped></style>
