export const filterMovies = (movies, savedMoviesId, filter) => {
  const allMovies = movies.map((item) => ({
    id: item.id,
    country: item.country,
    created_at: item.created_at,
    description: item.description,
    director: item.director,
    duration: item.duration,
    image: item.image,
    nameRU: item.nameRU,
    nameEN: item.nameEN,
    trailerLink: item.trailerLink,
    year: item.year,
    isSaved: savedMoviesId.includes(String(item.id))
   }))
   let filterResult = allMovies.filter(item => {
    let position = -1;
    while((position = item.nameRU.replace( /^\s+/g, '').toLowerCase().indexOf(filter.toLowerCase(), position + 1)) != -1){
      if(position != -1){
        return item;
      } else{
        return false;
      }
    }
  })
  
  return filterResult;
}