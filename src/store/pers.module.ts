import { Commit } from 'vuex';
import { Person } from '@/types/person';

function getFavoriteCharacters() {
    const favorites = localStorage.getItem('favoriteCharacters');
    return favorites ? JSON.parse(favorites) : [];
}
  
const state = {
    persones: getFavoriteCharacters()
};
  

export const pers = {
  namespaced: true,
  state,
  getters: {
    getFavoriteCharacters: (state: any) => state.persones,
  },
  actions: {
    addFavorite({ commit }: { commit: Commit }, person: any) {
      commit('addToFavorites', person);
    },
    removeFavorite({ commit }: { commit: Commit }, person: any) {
      commit('removeFromFavorites', person);
    }
  },
  mutations: {
    addToFavorites(state: any, person: any) {
      if (!state.persones.some((existingPerson: Person) => existingPerson.name === person.name)) {
        state.persones.push(person);
        localStorage.setItem('favoriteCharacters', JSON.stringify(state.persones));
      }
    },
    removeFromFavorites(state: any, person: any) {
      const index = state.persones.findIndex((existingPerson: Person) => existingPerson.name === person.name);
      if (index !== -1) {
        state.persones.splice(index, 1);
        localStorage.setItem('favoriteCharacters', JSON.stringify(state.persones));
      }
    }
  }  
};
