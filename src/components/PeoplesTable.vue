<template>
  <table class="table p-tb-1">
    <thead>
      <tr class="text-left upper table-head">
        <th class="w-20">name</th>
        <th class="w-20">height</th>
        <th class="w-20">mass</th>
        <th class="w-20">hair_color</th>
        <th class="text-right w-40">Add Favorite/Remove favorite</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="person in pers" :key="person.name" class="text-left">
        <td class="w-20">{{ person.name }}</td>
        <td class="w-20">{{ person.height }}</td>
        <td class="w-20">{{ person.mass }}</td>
        <td class="w-20">{{ person.hair_color }}</td>
        <td class="text-right w-40">
          <button @click="toggleFavorite(person)" class="fav-btn" v-if="!isFavorite(person)">
            Add Favorite
          </button>
          <button @click="toggleRemFavorite(person)" class="fav-btn" v-else>
            Remove Favorite
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
  
<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useApi } from '@/api/api';
  import { Person } from '@/types/person';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const pers = ref([] as Person[]);
  const { fetchPeoples } = useApi();
// Проверяю на нахождение в в избранном
  const isFavorite = (person: any) => {
    const favoriteCharacters = store.state.pers.persones;
    return favoriteCharacters.some((existingPerson: Person) => existingPerson.name === person.name);
  };
// Подгружаю апишку
  const getPeoples = async () => {
    try {
      const response = await fetchPeoples();
      pers.value = response.results;
    } catch (error) {
      console.error(error);
    }
  };
// Обработчики кликов
  const toggleFavorite = (person: any) => {
    store.dispatch('pers/addFavorite', person);
  };

  const toggleRemFavorite = (person: any) => {
    store.dispatch('pers/removeFavorite', person);
  };
// Отработка апи до монтирования
  onMounted(() => {
    getPeoples();
  });
</script>
  