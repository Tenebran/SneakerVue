<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70" />
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 select-none">
    <DrawerHead @on-drawer-open="emit('onDrawerOpen')" />

    <CardListItem :cart="action?.cart.value" />

    <InfoBlock
      v-if="orderId"
      img-url="/order-success-icon.png"
      :title="t('Drawer.order_placed')"
      :description="t('Drawer.order_notification', { orderId })" />

    <InfoBlock
      v-if="!totalPrice && !orderId"
      img-url="/package-icon.png"
      :title="t('Drawer.cart_is_empty')"
      :description="t('Drawer.add_at_least_one_pair_to_order')" />

    <div class="flex flex-col gap-4 mt-7" v-else>
      <div class="flex gap-2">
        <span>{{ t('Drawer.total') }}</span>
        <div class="border-b border-dashed flex-1"></div>
        <b>{{ totalPrice }}</b>
      </div>

      <div class="flex gap-2">
        <span>{{ t('Drawer.tax_5_percent') }}</span>
        <div class="border-b border-dashed flex-1"></div>
        <b> {{ (props.totalPrice / 100) * 5 }} {{ t('Drawer.currency_eur') }}</b>
      </div>
      <button
        @click="createOrder"
        :disabled="!totalPrice || isLoadingOrdner"
        class="mt-4 bg-lime-500 hover:bg-lime-600 w-full disabled:bg-slate-300 rounded-xl py-3 cursor-pointer active:bg-lime-700 text-white">
        {{
          isLoadingOrdner
            ? t('Drawer.sending')
            : !totalPrice
            ? t('Drawer.cart_is_empty')
            : t('Drawer.place_order')
        }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DrawerHead from './DrawerHead.vue';
import { ItemsType } from '../../App.vue';
import CardListItem from './CardListItem.vue';
import InfoBlock from '../infoBlock/InfoBlcok.vue';
import { inject, onMounted, onUnmounted, Ref, ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';

const action = inject<{ cart: Ref<ItemsType[]>; removeFromCart: (item: ItemsType) => void }>(
  'cart'
);
const isLoadingOrdner = ref(false);
const orderId = ref(null);

const { t } = useI18n();
const props = defineProps<{
  totalPrice: number;
}>();

const createOrder = async () => {
  try {
    isLoadingOrdner.value = true;
    const { data } = await axios.post(`https://43cace301b44f096.mokky.dev/orders`, {
      items: action?.cart.value,
      totalPrice: props.totalPrice,
    });

    orderId.value = data.id;
    action?.cart.value.splice(0, action.cart.value.length);

    isLoadingOrdner.value = false;

    return data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  document.body.classList.add('overflow-hidden');
});

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden');
});

const emit = defineEmits(['onDrawerOpen']);
</script>

<style scoped></style>
