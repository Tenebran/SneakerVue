<template>
  <header class="flex justify-between border-b border-slate-300 px-10 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="logo" class="w-10" />
      <div>
        <h1 class="text-xl font-bold uppercase">SNEAKERVUE</h1>
        <p class="text-slate-400">Магазин лучших товаров</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
        <img src="/cart.svg" alt="svg" />
        <b>1205 руб</b>
      </li>
      <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
        <img src="/heart.svg" alt="Cart" />
        <span>Закладки</span>
      </li>

      <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="profile" />
        <span>profile</span>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
