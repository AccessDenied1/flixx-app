const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const results = fetchAPIData('movies/popular');
  console.log(results);
}

//fetch data from TMBD
async function fetchAPIData(endpoint) {
  const API_URL = 'https://api.themoviedb.org/3/';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer db5d851cca86bca03944d4e518af2c41',
    },
  };

  fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=db5d851cca86bca03944d4e518af2c41&language=en-US'
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

//Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

//Init Page
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      console.log('home');
      break;
    case '/shows.html':
      console.log('Shows');
      break;
    case '/movie-details.html':
      console.log('Movies Details');
      break;
    case 'tv-details.html':
      console.log('Tv Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
