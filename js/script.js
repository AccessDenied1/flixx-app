const global = {
    currentPage: window.location.pathname
}

async function displayPopularMovies(){
    const results = fetchAPIData('/movies/popular');
    console.log(results);
}

//fetch data from TMBD
async function fetchAPIData(endpoint){
    const API_KEY = 'db5d851cca86bca03944d4e518af2c41'
    const API_URL = 'https://api.themoviedb.org/3/'

    const response = fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await response.json();
    return data;

}

//Highlight active link
function highlightActiveLink(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active')
        }
    })

}

//Init Page
function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
            console.log("home");
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

document.addEventListener('DOMContentLoaded', init)
