<template>
  <div>
    <div
      class="relative h-[450px] bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
      <img
        @click="() => actions?.addToFavorite(item)"
        :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
        alt="Like 1"
        class="absolute top-8 left-8" />
      <img :src="imgUrl" alt="Sneaker" class="h-[224px]" />
      <p class="mt-2">{{ title }}</p>

      <div class="flex justify-between mt-5">
        <div class="flex flex-col">
          <span class="text-slate-400">{{ t('Card.price') }}</span>
          <b>{{ price }} {{ t('Card.currency_eur') }}</b>
        </div>
        <img
          v-if="actionsCart?.onCklickAddPlus"
          @click="actionsCart?.onCklickAddPlus(item)"
          :src="isAdded ? '/checked.svg' : '/plus.svg'"
          alt="plus" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { ItemsType } from '../../App.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
  imgUrl: string;
  item: ItemsType;
  title: string;
  price: number;
  isFavorite: boolean;
  isAdded: boolean;
}>();

const actions = inject<{
  addToFavorite: (item: ItemsType) => void;
}>('actions');

const actionsCart = inject<{
  onCklickAddPlus: (item: ItemsType) => void;
}>('cart');
</script>

<style scoped></style>
