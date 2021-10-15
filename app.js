const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

let form = document.querySelector(".search")
let search = document.querySelector("#search");
let films = document.querySelector(".main")

getMovies(API_URL)

async function getMovies(url) {
    const response = await fetch(url)
    const data = await response.json();
    showMovie(data.results)
}

function showMovie(movies) {
    films.innerHTML = ''
    movies.forEach(movie => {
        const { poster_path, overview, vote_average, original_title } = movie

        main = document.createElement("div");
        main.classList.add("show")
        main.innerHTML = `
 
     <img src="${IMG_PATH + poster_path}"  alt="${original_title}">
     <div class="info">
         <h2>${original_title}</h2>
         <span class="imdb ${voteColor(vote_average)}">${vote_average}</span>
     </div>
     <div class="overview">
         <h3>Overviev</h3>
         <p>${overview}</p>
     </div>
     `

        films.appendChild(main)
    });

}

function voteColor(vote) {

    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'red'
    } else {
        return 'cool'
    }

}


form.addEventListener('submit', (e) => {

    let searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
    e.preventDefault()
})