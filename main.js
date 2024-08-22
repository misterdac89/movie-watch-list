const formContainer = document.getElementById("form-container");
const inputEl = document.getElementById("input-el");
const movieWrapper = document.getElementById("movie-wrapper");
const movieDisplay = document.getElementById("movie-display");
let moviesList = [];
let watchlist = [];

// Displaying the first contents of the main element
document.addEventListener("DOMContentLoaded", () => {
  movieWrapper.innerHTML = `
    <div class='center'>
        <i class="fa-solid fa-film film-icon"></i>
        <h3 class="exploring">Start exploring</h3>
    </div>
  `;
});

formContainer.addEventListener("submit", async (e) => {
  // Preventing the default bevahior of form element
  e.preventDefault();

  // Saving the input element value in a const variable
  const movieTitle = inputEl.value;

  // Fetching movies data from www.omdapi.com
  const response = await fetch(
    `http://www.omdbapi.com/?t=${movieTitle}&apikey=262ce955&`
  );

  console.log(response)
  const data = await response.json();

  if (data.Response === "True") {
    // Pushing data to the empty movieslist array if data.response returns 'True'
    moviesList.push(data);
  } else if (movieTitle && data.Response !== "True") {
    // Displaying message to users if a film was searched and data.response returns 'False'
    movieWrapper.innerHTML = `
        <div class='center'>
          <h3 class="exploring">
          Unable to find what you're looking for. Please try another search.
          </h3>
        </div>
      `;
  } else {
    // Displaying message if input Element does not have a value
    movieWrapper.innerHTML = `
        <div class='center'>
          <h3 class="exploring">
            Please! select a movie
          </h3>
        </div>
      `;
  }

  // Looping through moviesList array using the forEach method
  moviesList.forEach((movie) => {
    if (movieTitle) {
      movieWrapper.style.display = "none";

      // Rendering html elements for each found searched film
      movieDisplay.innerHTML += `
      <div class='movie-info'>
        <div class='col1'>
          <img src="${movie.Poster}" class="movie-poster">
        </div>

        <div class='col2'>
          <div class="col2-header">
            <h4 class="film-title">${movie.Title}</h4>
            <div class="rating-wrapper">
              <i class="fa-solid fa-star star-icon"></i>
              <p class="rating">${movie.imdbRating}</p>
            </div>
          </div>

          <div class="movie-genre">
            <p>${movie.Runtime}</p>
            <p>${movie.Genre}</p>
            <div class="movie-genre-icon-box">
              <div class="watchlist-icon-wrapper">
                <i class="fa-solid fa-plus watchlist-icon id="add"></i>
              </div>
              <p class="watchlist">watchlist</p>
            </div>
          </div>

          <p class="description">${movie.Plot}</p>
        </div>
      <div>
    `;
    }
  });

  // Resetting the form element
  formContainer.reset();
  // Reassignement of the moviesList array
  moviesList = [];
});



