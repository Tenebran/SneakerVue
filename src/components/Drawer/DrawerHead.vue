<template>
  <div class="items-center gap-5 mb-8 flex">
    <svg
      @click="emit('onDrawerOpen')"
      class="opacity-30 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 7H14.7143"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M8.71436 1L14.7144 7L8.71436 13"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>

    <h2 class="text-2-xl font-bold">{{ t('Drawer.cart') }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['onDrawerOpen']);
const { t } = useI18n();
</script>

<style scoped></style>
