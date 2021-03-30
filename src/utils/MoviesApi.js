import { MOVIES_URL } from './config';

export const getMovies = () => {
  return fetch(MOVIES_URL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    } 
      return Promise.reject(`Ошибка: ${res.status}`)
  })
};