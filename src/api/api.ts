const baseUrl = 'https://swapi.dev';

async function fetchData(endpoint: string, options = {}) {
  const response = await fetch(`${baseUrl}/api${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.statusText}`);
  }

  const contentType = response.headers.get('Content-Type');

  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    return await response.text();
  }
}

export function fetchPeoples() {
  return fetchData(`/people`);
}

export function fetchPeople(search: string) {
  return fetchData(`/people/?search=${search}`);
}

export function fetchPeopleInfo(id: number) {
  return fetchData(`/people/${id}`);
}

export function fetchFilm(id: number) {
  return fetchData(`/people/${id}`);
}

export function useApi() {
  return {
    fetchPeoples,
    fetchPeople,
    fetchPeopleInfo,
    fetchFilm
  };
}
  