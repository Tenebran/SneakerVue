<template>
  <div class="min-h-[100vh]">
    <div class="flex justify-between items-center select-none">
      <h2 class="text-3xl font-bold mb-8">{{ t('Home.all_sneakers') }}</h2>
      <div class="flex gap-4">
        <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
          <option value="name">{{ t('Home.by_name') }}</option>
          <option value="price">{{ t('Home.by_price_ascending') }}</option>
          <option value="-price">{{ t('Home.by_price_descending') }}</option>
        </select>
        <div class="relative">
          <img src="/search.svg" class="absolute top-3 left-3" />
          <input
            @input="onChangeInput"
            :value="filters.searchQuery"
            :placeholder="t('Home.search_placeholder')"
            class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-green-400" />
        </div>
      </div>
    </div>
    <CardList :items="items" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import CardList from '../components/Cards/CardList.vue';
import { ItemsType } from '../App.vue';
import { debounce } from 'lodash';
import { inject, onMounted, provide, Ref, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const items = ref<ItemsType[]>([]);
const action = inject<{ cart: Ref<ItemsType[]>; removeFromCart: (item: ItemsType) => void }>(
  'cart'
);
const filters = ref({
  sortBy: 'title',
  searchQuery: '',
});

const onChangeSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement;

  filters.value.sortBy = target.value;
};

const onChangeInput = debounce((event: Event) => {
  const target = event.target as HTMLSelectElement;

  filters.value.searchQuery = target.value;
}, 400);

const addToFavorite = async (item: ItemsType) => {
  try {
    if (!item.isFavorite) {
      const { data } = await axios.post(`https://43cace301b44f096.mokky.dev/favorite`, {
        item_id: item.id,
        isFavorite: true,
      });
      item.favoriteId = data.id;
      item.isFavorite = true;
    } else {
      await axios.delete(`https://43cace301b44f096.mokky.dev/favorite/${item.favoriteId}`);
      item.isFavorite = false;
      item.favoriteId = '';
    }
  } catch (error) {
    console.error(error);
  }
};

const fetcFavorites = async () => {
  try {
    const { data } = await axios.get(`https://43cace301b44f096.mokky.dev/favorite`);
    items.value = items.value.map((item) => {
      const favorite = data.find((f: any) => f.item_id === item.id);
      return favorite ? { ...item, isFavorite: true, favoriteId: favorite.id } : item;
    });
  } catch (error) {
    console.error(error);
  }
};

const fetchItems = async () => {
  try {
    const params: { sortBy: string; title?: string } = {
      sortBy: filters.value.sortBy,
    };

    if (filters.value.searchQuery) {
      params.title = `*${filters.value.searchQuery}*`;
    }
    const { data } = await axios.get(`https://43cace301b44f096.mokky.dev/items`, { params });

    items.value = data.map((item: any) => ({ ...item, isFavorite: false, isAdded: false }));
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchItems(), await fetcFavorites();
  if (action)
    items.value = items.value.map((i) => ({
      ...i,
      isAdded: action?.cart.value.some((c) => c.id === i.id),
    }));
});

provide('actions', { addToFavorite });

action?.cart &&
  watch(
    action?.cart,
    () => {
      if (action)
        items.value = items.value.map((i) => ({
          ...i,
          isAdded: action?.cart.value.some((c) => c.id === i.id),
        }));
    },
    { deep: true }
  );
watch(filters.value, fetchItems);
</script>

<style scoped></style>
