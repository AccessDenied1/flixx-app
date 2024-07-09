const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = fetchAPIData('movie/popular');
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = ` 
      <a href='movie-details.html?id=${movie.id}'>
        ${
          movie.poster_path
            ? `<img
              src='https://image.tmdb.org/t/p/w500${movie.poster_path}'
              class='card-img-top'
              alt='${movie.title}'
            />`
            : `<img
              src='images/no-image.jpg'
              class='card-img-top'
              alt='${movie.title}'
            />`
        }
      </a>
      <div class='card-body'>
        <h5 class='card-title'>${movie.title}</h5>
        <p class='card-text'>
          <small class='text-muted'>Release: ${movie.release_date}</small>
        </p>
      </div>`;
    document.appendChild('div');
  });
}
//fetch data from TMBD
async function fetchAPIData(endpoint) {
  const API_URL = 'https://api.themoviedb.org/3/';
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=db5d851cca86bca03944d4e518af2c41&language=en-US`
  );

  const data = await response.json();
  console.log('data = ', data);
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
