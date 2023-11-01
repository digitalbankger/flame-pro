<template>
  <div>
    <h1>{{ person.name }}</h1>
    <p>Mass: {{ person.mass }}</p>
    <p>Height: {{ person.height }}</p>
    <p>Hair: {{ person.hair_color }}</p>
    <p>Skin: {{ person.skin_color }}</p>
    <p>Eye color: {{ person.eye_color }}</p>
    <p>Birth year: {{ person.birth_year }}</p>
    <p>Gender: {{ person.gender }}</p>
    <p>Home world: {{ person.homeworld }}</p>
    <p>Films:</p>
    <li v-for="filmTitle in filmTitles" :key="filmTitle">
        {{ filmTitle }}
    </li>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '@/api/api';
import { Person } from '@/types/person';
import { useRoute } from 'vue-router';

const { fetchPeopleInfo } = useApi();
const person = ref({} as Person[]);
const filmTitles = ref<string[]>([]);

// Получаю айдишник из параметра урла
const getPersonIdFromRoute = () => {
  const router = useRoute();
  return router.params.id;
};

// Получаю по айдишнику объект перса
onMounted(async () => {
  const id = getPersonIdFromRoute();
  try {
    const response = await fetchPeopleInfo(id);
    person.value = response;
    console.log(person)
    const films = person.value.films;
    filmTitles.value = await Promise.all(films.map(async (filmUrl) => {
      const filmResponse = await fetch(filmUrl);
      const filmData = await filmResponse.json();
      return filmData.title;
    }));
  } catch (error) {
    console.error(error);
  }
});
</script>
  