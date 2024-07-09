const global = {
  currentPage: window.location.pathname,
};

async function displayPopularTvShows() {
  const { results } = await fetchAPIData('tv/popular');
  results.forEach((tvShow) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="tv-details.html?id=1">
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Show Title"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">Show Title</h5>
            <p class="card-text">
              <small class="text-muted">Aired: XX/XX/XXXX</small>
            </p>
          </div>
        </div>`;
  });
}

async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = ` 
        <a href='tv-details.html?id=${show.id}'>
          ${
            show.poster_path
              ? `<img
                src='https://image.tmdb.org/t/p/w500${show.poster_path}'
                class='card-img-top'
                alt='${show.name}'
              />`
              : `<img
                src='images/no-image.jpg'
                class='card-img-top'
                alt='${show.name}'
              />`
          }
        </a>
        <div class='card-body'>
          <h5 class='card-title'>${show.name}</h5>
          <p class='card-text'>
            <small class='text-muted'>Aired: ${show.first_air_date}</small>
          </p>
        </div>`;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
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
    document.querySelector('#popular-movies').appendChild(div);
  });
}

//fetch data from TMBD
async function fetchAPIData(endpoint) {
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=db5d851cca86bca03944d4e518af2c41&language=en-US`
  );

  const data = await response.json();

  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
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
      break;
    case '/shows.html':
      displayPopularShows();
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
