<template>
  <input v-model="search" placeholder="Search" class="form-search">
  <ul v-if="persons.length > 0" class="w-80 search-menu animate">
    <li v-for="person in persons" :key="person.name">
      <router-link :to="'/people/' + getPersonId(person.url)" class="link link-search">{{ person.name }}</router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useApi } from '@/api/api';
import { Person } from '@/types/person';

const { fetchPeople } = useApi();
const search = ref('');
const persons = ref([] as Person[]);

let searchTimeout: any;

// Извлекаю айди перса (???)
const getPersonId = (url: string) => {
  const matches = url.match(/\/(\d+)\/$/);
  if (matches) {
    return matches[1];
  }
  return '';
};
//Ищу пользователя по апи по символам из инпута
const searchPeople = async () => {
  try {
    if (search.value) {
      const response = await fetchPeople(`${search.value}`);
      persons.value = response.results;
    } else {
      persons.value = [];
    }
  } catch (error) {
    console.error(error);
  }
};
// Ватчер на слежку инпута
watch(search, () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchPeople();
  }, 500); 
});
// Подгружаю апи до монтирования
onMounted(() => {
  searchPeople();
});

</script>
  
