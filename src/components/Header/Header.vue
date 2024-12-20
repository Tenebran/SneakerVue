<template>
  <header class="flex justify-between border-b border-slate-100 px-10 py-8 select-none">
    <router-link v-bind:to="'/'">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="logo" class="w-10" />
        <div>
          <h1 class="text-xl font-bold uppercase">SNEAKERVUE</h1>
          <p class="text-slate-400">{{ t('Header.best_products_store') }}</p>
        </div>
      </div></router-link
    >

    <ul class="flex items-center gap-10">
      <li
        class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
        @click="emit('onDrawerOpen')">
        <img src="/cart.svg" alt="svg" />
        <b>{{ totalPrice }} {{ t('Header.currency_eur') }}</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Cart" />
          <span>{{ t('Header.favorites') }}</span>
        </li></router-link
      >

      <div class="relative select-none w-24 inline-block">
        <div
          @click="toggleDropdown"
          class="py-2 px-3 border rounded-md outline-none cursor-pointer">
          <img :src="currentLanguage?.flag" alt="Flag" class="w-6 h-6 inline-block mr-2 ml-2" />
          <span class="font-bold">{{ currentLanguage?.code }}</span>
        </div>
        <ul v-show="isOpen" class="absolute bg-white border rounded-md shadow-md mt-1 w-52 z-10">
          <li
            v-for="language in languages"
            :key="language.code"
            @click="changeLanguage(language)"
            class="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 cursor-pointer">
            <div class="flex">
              <img :src="language.flag" alt="Flag" class="w-6 h-6 mr-4" />
              <span>{{ language.label }}</span>
            </div>
          </li>
        </ul>
      </div>
    </ul>
  </header>
</template>

<script setup lang="ts">
import RuFlag from '../../img/flag/flag-ru.svg';
import EnFlag from '../../img/flag/flag-united-kingdom-flag.svg';
import ARFlag from '../../img/flag/flag-for-flag-united-arab-emirates.svg';
import DEFlag from '../../img/flag/flag-de.svg';
import ESFlag from '../../img/flag/flag-for-flag-spain.svg';
import ITFlag from '../../img/flag/flag-for-flag-italy.svg';
import FRFlag from '../../img/flag/flag-for-flag-france.svg';
import ZHFlag from '../../img/flag/flag-for-flag-china.svg';
import KOFlag from '../../img/flag/flag-kp.svg';
import PLFlag from '../../img/flag/flag-for-flag-poland.svg';
import NLFlag from '../../img/flag/flag-for-flag-netherlands.svg';
import SVFlag from '../../img/flag/flag-for-flag-sweden.svg';
import TRFlag from '../../img/flag/flag-turkey.svg';
import PTFlag from '../../img/flag/flag-portugal.svg';
import JAFlag from '../../img/flag/flag-for-japan.svg';
import { useI18n } from 'vue-i18n';
import { computed, onBeforeUnmount, onMounted, ref, Ref } from 'vue';

defineProps<{ totalPrice: number }>();

type LanguagesType = { code: string; flag: string; label: string };

const { t, locale } = useI18n();
const emit = defineEmits(['onDrawerOpen']);

const currentLanguage: Ref<LanguagesType | null> = ref(null);

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const languages = computed<LanguagesType[]>(() =>
  [
    { code: 'en', flag: EnFlag },
    { code: 'ru', flag: RuFlag },
    { code: 'de', flag: DEFlag },
    { code: 'zh', flag: ZHFlag },
    { code: 'ko', flag: KOFlag },
    { code: 'fr', flag: FRFlag },
    { code: 'ja', flag: JAFlag },
    { code: 'nl', flag: NLFlag },
    { code: 'sv', flag: SVFlag },
    { code: 'es', flag: ESFlag },
    { code: 'it', flag: ITFlag },
    { code: 'pl', flag: PLFlag },
    { code: 'tr', flag: TRFlag },
    { code: 'ar', flag: ARFlag },
    { code: 'pt', flag: PTFlag },
  ].map((language) => ({
    ...language,
    label: t(`languageSelector.${language.code}`),
  }))
);

const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.relative');
  if (!dropdown?.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
currentLanguage.value =
  languages.value.find((lang) => lang.code === localStorage.getItem('lang')) || languages.value[0];
locale.value = currentLanguage.value.code;

const changeLanguage = (lang: LanguagesType) => {
  locale.value = lang.code;
  localStorage.setItem('lang', lang.code);
  currentLanguage.value = lang;
  isOpen.value = false;
};
</script>
