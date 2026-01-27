// JavaScript literal array of movies
const movies = [
    { title: "The Matrix", genre: "Sci-Fi", rating: 5 },
    { title: "Inception", genre: "Thriller", rating: 5 },
    { title: "The Room", genre: "Drama", rating: 2 },
    { title: "Interstellar", genre: "Sci-Fi", rating: 4.5 },
    { title: "Sharknado", genre: "Action", rating: 3 },
    { title: "The Godfather", genre: "Crime", rating: 5 },
    { title: "Pulp Fiction", genre: "Crime", rating: 4.5 }
];

// Display all movies
let allMoviesHTML = "";
movies.forEach(function (movie) {
    allMoviesHTML += `<div class="movie">${movie.title} - ${movie.genre} - ${movie.rating}⭐</div>`;
});
document.getElementById('allMovies').innerHTML = allMoviesHTML;

// Filter: Highly rated movies (rating >= 4)
const topRatedMovies = movies.filter(function (movie) {
    return movie.rating >= 4;
});

let topMoviesHTML = "";
topRatedMovies.forEach(function (movie) {
    topMoviesHTML += `<div class="movie">${movie.title} - ${movie.rating}⭐</div>`;
});
document.getElementById('topMovies').innerHTML = topMoviesHTML;

// Map: Extract just the titles
const movieTitles = movies.map(function (movie) {
    return movie.title;
});

document.getElementById('titlesList').innerHTML = `<div class="movie">${movieTitles.join(", ")}</div>`;

console.log("All movies:", movies);
console.log("Top rated movies:", topRatedMovies);
console.log("Movie titles:", movieTitles);
