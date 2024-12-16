<script setup lang="ts">
import Header from './components/Header.vue';
import CardList from './components/CardList.vue';
import Drawer from './components/Drawer/Drawer.vue';
</script>

<template>
  <!-- <Drawer /> -->
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14 mb-14">
    <Header />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кросовки</h2>
        <div class="flex gap-4">
          <select class="py-2 px-3 border rounded-md outline-none">
            <option>По названию</option>
            <option>По цене</option>
            <option>Дешевле</option>
          </select>
          <div class="relative">
            <img src="/search.svg" class="absolute top-3 left-3" />
            <input
              placeholder="Поиск..."
              class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-green-400" />
          </div>
        </div>
      </div>
      <CardList />
    </div>
  </div>
</template>

<style scoped></style>
