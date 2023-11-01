<template>
  <table class="table p-tb-1">
    <thead>
      <tr class="text-left upper table-head">
        <th class="w-20">name</th>
        <th class="w-20">height</th>
        <th class="w-20">mass</th>
        <th class="w-20">hair_color</th>
        <th class="text-right w-40">Remove favorite</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="person in favorites" :key="person.name" class="text-left">
        <td class="w-20">{{ person.name }}</td>
        <td class="w-20">{{ person.height }}</td>
        <td class="w-20">{{ person.mass }}</td>
        <td class="w-20">{{ person.hair_color }}</td>
        <td class="text-right w-40">
          <button @click="toggleRemFavorite(person)" class="fav-btn">
            Remove Favorite
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
  
const store = useStore();

const favorites = computed(() => {
    return store.getters['pers/getFavoriteCharacters'];
});

const toggleRemFavorite = (person: any) => {
  store.dispatch('pers/removeFavorite', person);
};
</script>
  