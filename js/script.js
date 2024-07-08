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
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjVkODUxY2NhODZiY2EwMzk0NGQ0ZTUxOGFmMmM0MSIsIm5iZiI6MTcyMDQ0NDQzNC4wNzAxMjYsInN1YiI6IjY2ODhmZTMyNDM5ZWMxOWZjMjFkMGUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7gm6uEvyHcg7tXaGv6Ie3ob5OUe2rXJNNwokZrG79yA',
    },
  };

  const response = fetch(`${API_URL}${endpoint}?language=en-US`, options);
  console.log('response = ', response);
  const data = (await response).json;
  return data;
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
