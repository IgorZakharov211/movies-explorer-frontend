export const filterMovies = (movies, savedMoviesId, filter) => {
  const allMovies = movies.map((item) => ({
    id: item.id,
    country: (item.country !== null) ? item.country: 'Не известно',
    created_at: item.created_at,
    description: (item.description !== null) ? item.description : 'Не указано',
    director: (item.director !== null) ? item.director : 'Не указано',
    duration: (item.duration !== null) ? item.duration : 60,
    image: (item.image !== null) ? item.image : 'https://image.freepik.com/free-vector/error-404-page-not-found-oops-trouble-internet-warning-design_175838-592.jpg',
    movieId: (item.movieId !== undefined) ? item.movieId : item.id,
    nameRU: (item.nameRU !== null) ? item.nameRU : 'Не указано',
    nameEN: (item.nameEN !== null) ? item.nameEN : 'Не указано',
    trailerLink: (item.trailerLink !== null) ? item.trailerLink : 'https://www.youtube.com/',
    year: (item.year !== null) ? item.year : 'Не указано',
    isSaved: savedMoviesId.includes(String(item.id)),
    isShort: (item.duration < 40) ? true : false
   }))
   const filterResult = allMovies.filter(item => {
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
