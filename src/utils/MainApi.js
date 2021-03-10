import { BASE_URL, IMAGE_URL } from './config';

const _checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Ошибка: ${res.status}`); 
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
  })
  .then((res) => {
    if (res.ok){
      return res.json();
    }
      return Promise.reject(res);
  })
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    if(res.ok){
      return res.json();
    }
     return Promise.reject(res);
  })
};

export const getProfile = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => _checkRes(res))
};

export const patchMyInfo = (name, email, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
  .then((res) => _checkRes(res))
}

export const getMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => _checkRes(res))
}

export const createMovie = (token, country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      country: country,
      director: director,
      duration: Number(duration),
      year: year,
      description: description,
      image: `${IMAGE_URL}${image}`,
      trailer: trailer,
      thumbnail: `${IMAGE_URL}${thumbnail}`,
      movieId: String(movieId),
      nameRU: nameRU,
      nameEN: nameEN
    })
  })
  .then((res) => _checkRes(res))
}

export const deleteMovie = (token, id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => _checkRes(res))
}