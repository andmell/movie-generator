var searchButton = document.querySelector("#searchbtn");
var searchBar = document.querySelector('#searchBar');
var nowShowingDiv = document.querySelector('#nowShowing');
var streamingDiv = document.querySelector('#searchResults');

testbtn.addEventListener('click', () => {
	const streamAPI = 'https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=movie&genre=18&show_original_language=en&keyword=zombie';
		fetch(streamAPI, {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '427fcc77demsh18662408cbc8325p1efa87jsn99cd4f6001b3',
	            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
			}
		}).then(function (response) {
			return response.json();
		}).then(function (data){
			console.log(data);
		})
});

searchButton.addEventListener('click', () => {
	let searchedMovie = searchBar.value;
	var showtimesURL = `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}/`;
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


// for query need 'status', 'original_title', 'genres:array'
searchButton.addEventListener("click", () => {

});

// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value

// // Update the current slider value (each time you drag the slider handle)
// slider.oninput = function () {
//     output.innerHTML = this.value;
// }