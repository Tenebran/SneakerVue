<template>
  <div>
    <div
      class="relative h-[450px] bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
      <img
        @click="() => actions?.addToFavorite(item)"
        :src="isFavorite ? logoPath2 : logoPath1"
        alt="Like 1"
        class="absolute top-8 left-8" />
      <img :src="imagePath" alt="Sneaker" class="h-[224px]" />
      <p class="mt-2">{{ t(`Card.${title}`) }}</p>

      <div class="flex justify-between mt-5">
        <div class="flex flex-col">
          <span class="text-slate-400">{{ t('Card.price') }}</span>
          <b>{{ price }} {{ t('Card.currency_eur') }}</b>
        </div>
        <img
          v-if="actionsCart?.onCklickAddPlus"
          @click="actionsCart?.onCklickAddPlus(item)"
          :src="isAdded ? logoChecked : logPlus"
          alt="plus" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { ItemsType } from '../../App.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  imgUrl: string;
  item: ItemsType;
  title: string;
  price: number;
  isFavorite: boolean;
  isAdded: boolean;
}>();

const { t } = useI18n();
const imagePath = computed(() => `${import.meta.env.BASE_URL}${props.imgUrl}`);
const logoPath2 = computed(() => `${import.meta.env.BASE_URL}like-2.svg`);
const logoPath1 = computed(() => `${import.meta.env.BASE_URL}like-1.svg`);
const logoChecked = computed(() => `${import.meta.env.BASE_URL}checked.svg`);
const logPlus = computed(() => `${import.meta.env.BASE_URL}plus.svg`);

const actions = inject<{
  addToFavorite: (item: ItemsType) => void;
}>('actions');

const actionsCart = inject<{
  onCklickAddPlus: (item: ItemsType) => void;
}>('cart');
</script>

<style scoped></style>
