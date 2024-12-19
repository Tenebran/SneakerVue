<template>
  <div class="flex flex-col gap-5 flex-1" v-auto-animate>
    <CardItem v-for="c in cart" :key="c.id" :cart="c" />
  </div>
</template>

<script setup lang="ts">
import { ItemsType } from '../../App.vue';
import CardItem from './CardItem.vue';

defineProps<{
  cart?: ItemsType[];
}>();
</script>

<style lang="scss" scoped></style>
