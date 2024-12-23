<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <img height="120" width="120" :src="image" alt="info Image" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400 mt-2">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  imgUrl: string;
  title: string;
  description: string;
}>();

const image = computed(() => `${import.meta.env.BASE_URL}${props.imgUrl}`);
</script>

<style scoped></style>
