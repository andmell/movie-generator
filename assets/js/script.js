var searchButton = document.querySelector("#searchbtn");
var searchBar = document.querySelector('#searchBar');
var nowShowingDiv = document.querySelector('#nowShowing');
var streamingDiv = document.querySelector('#searchResults');
var searchResults = document.querySelector('#searchResults');
let resultsCard = document.querySelector('#resultsCard');
let rangeNumber = document.querySelector('#myRange');
let ratingSelected = document.querySelector('#ratingSelected');
let movieCheckbox = document.querySelector('#movieType');
let seriesCheckbox = document.querySelector('#showType');

function getType(){
	if (movieCheckbox.checked && seriesCheckbox.checked){
		return "all"
	} else if (movieCheckbox.checked){
		return "movie"
	} else if (seriesCheckbox.checked){
		return "series"
	} else {
		return "all"
	}
}


searchButton.addEventListener('click', () => {
	getType();
	console.log(getType());
	let searchedMovie = searchBar.value;
	const streamAPI = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${searchedMovie}&country=us&show_type=${getType()}&output_language=en`;
    // title, shotype
	fetch(streamAPI, {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '427fcc77demsh18662408cbc8325p1efa87jsn99cd4f6001b3',
			'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
		}
	}).then(function (response) {
		return response.json();
	}).then(function (data) {
		console.log(data);
		resultsCard.innerHTML = '';
		for (var i = 0; i < data.result.length; i++) {
			console.log(data.result.length)
			let streamingCard = document.createElement('p');
			streamingCard.innerHTML =
				`<div id="resultsCard">
		        <div id="resultsImage">
		            <img src="${data.result[i].posterURLs[92]}"/>
		        </div>
		        <div id="resultsTop">
		            <h3>${data.result[i].title}</h3>
						<h3>${data.result[i].imdbRating}</h3>
		        </div>
		        <div id="resultsBot">
		            <h3>${data.result[i].streamingInfo.us}</h3>
		        </div>

		    </div>`

			resultsCard.appendChild(streamingCard);
		}
	})
});

searchButton.addEventListener('click', () => {
	let searchedMovie = searchBar.value;
	var showtimesURL = `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&vote_average.gte=10&overview=/`;
	fetch(showtimesURL, {
		headers: {
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmRlNGViNTc2ZTQxNjY2NzIxZjAxYTcxNGRkNDkwOCIsInN1YiI6IjY0Yzg0NGQxYzA0OGE5MDExY2Q3ZmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gi21mwDNoFGGVyoJeEh7iCgHVuDxTYUNIMzvIDak_7I"
		}
	}).then(function (response) {
		console.log(response)
		return response.json();
	}).then(function (data) {
		console.log(data);
		nowShowingDiv.innerHTML = '';
		for (var i = 0; i < data.results.length; i++) {
			console.log(data.results.length)
			movieCard = document.createElement('p');
			movieCard.innerHTML =
			`<div id="movieCard">
			    <div id="movieImage">
			</div>
			<div id="cardTop">
				<h2>${data.results[i].title}</h2>
				<h2>${data.results[i].vote_average}</h2>
			</div>
			<div id="cardBot">
				<h3>${data.results[i].overview}</h3>
			</div>
		</div>`

			nowShowingDiv.appendChild(movieCard);
		}
	})
})


// for query need title, overview, rating
searchButton.addEventListener("click", () => {

});

searchBar.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        searchButton.click();
    }
});


// Update the current slider value (each time you drag the slider handle)
