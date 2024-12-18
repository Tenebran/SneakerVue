<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead @on-drawer-open="emit('onDrawerOpen')" />

    <CardListItem :cart="cart" />

    <InfoBlock
      v-if="!totalPrice"
      img-url="/package-icon.png"
      title="Корзина пустая"
      description="Добавьте хотя  бы одну пару кросовок, чтобы сделать заказ" />

    <div class="flex flex-col gap-4 mt-7" v-else>
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="border-b border-dashed flex-1"></div>
        <b>{{ totalPrice }}</b>
      </div>

      <div class="flex gap-2">
        <span>Налог 5%:</span>
        <div class="border-b border-dashed flex-1"></div>
        <b> {{ (props.totalPrice / 100) * 5 }} р</b>
      </div>
      <button
        @click="() => emit('createOrder')"
        :disabled="!totalPrice || isLoadingOrdner"
        class="mt-4 bg-lime-500 hover:bg-lime-600 w-full disabled:bg-slate-300 rounded-xl py-3 cursor-pointer active:bg-lime-700 text-white">
        {{ isLoadingOrdner ? 'отправка....' : !totalPrice ? 'корзина пустая' : 'оформить заказ' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DrawerHead from './DrawerHead.vue';
import { ItemsType } from '../../App.vue';
import CardListItem from './CardListItem.vue';
import InfoBlock from '../infoBlock/InfoBlcok.vue';
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  cart: ItemsType[];
  totalPrice: number;
  isLoadingOrdner: boolean;
}>();

onMounted(() => {
  document.body.classList.add('overflow-hidden');
});

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden');
});

const emit = defineEmits(['onDrawerOpen', 'createOrder']);
</script>

<style scoped></style>
