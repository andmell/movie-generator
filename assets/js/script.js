var searchButton = document.querySelector("#searchbtn");
var nowShowingDiv = document.querySelector('#nowShowing');
var streamingDiv = document.querySelector('#searchResults');
var searchResults = document.querySelector('#searchResults');
let resultsCard = document.querySelector('#resultsCard');
let rangeNumber = document.querySelector('#myRange');
let ratingSelected = document.querySelector('#ratingSelected');
let movieCheckbox = document.querySelector('#movieType');
let seriesCheckbox = document.querySelector('#showType');
let savedSearches = document.querySelector('#history-buttons');
var searchButtonRapid = document.querySelector('#searchbtnRapid');
var searchBarRapid = document.querySelector('#searchBarRapid');
let releaseYear = document.getElementById("releaseYear");
let clearBtn = document.querySelector('#clearBtn');
let genreDropdown = document.querySelector('#genre');

// renderButtons();
function saveSearch(movieTitle) {
    const localRead = JSON.parse(localStorage.getItem("historyArray"));
    if (!localRead || localRead.length === 0) {
        localStorage.setItem("historyArray", JSON.stringify([movieTitle]))
    } else if (localRead.includes(movieTitle)) {
        var firstMovie = localRead.indexOf(movieTitle);
        localRead.splice(firstMovie, 1);
        localRead.push(movieTitle);
        localStorage.setItem("historyArray", JSON.stringify(localRead));
    } else {
        localRead.push(movieTitle);
        localStorage.setItem("historyArray", JSON.stringify(localRead));
    }
    // renderButtons();
}

// function renderButtons() {
//     savedSearches.innerHTML = '';
//     const localReadAgain = JSON.parse(localStorage.getItem("historyArray"))
//     if (localReadAgain){
//     for (var i = 0; i < localReadAgain.length; i++) {
//         var pastButton = document.createElement('button');
//         pastButton.textContent = localReadAgain[i];
//         pastButton.addEventListener('click', (e) => {
//             getNowPlaying(e.target.textContent);
//         })
//         savedSearches.prepend(pastButton);
//     }}
// }

// function saveSearch(movieTitle) {
//     const localRead = JSON.parse(localStorage.getItem("historyArray"));
//     if (!localRead || localRead.length === 0) {
//         localStorage.setItem("historyArray", JSON.stringify([movieTitle]))
//     } else if (localRead.includes(movieTitle)) {
//         var firstMovie = localRead.indexOf(movieTitle);
//         localRead.splice(firstMovie, 1);
//         localRead.push(movieTitle);
//         localStorage.setItem("historyArray", JSON.stringify(localRead));
//     } else {
//         localRead.push(movieTitle);
//         localStorage.setItem("historyArray", JSON.stringify(localRead));
//     }
//     renderButtons();
// }
function getNowStreaming(){
	getType();
	console.log(getType());
	let searchedMovie = searchBarRapid.value;
	// const streamAPI = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${searchedMovie}&country=us&show_type=${getType()}&output_language=en`;
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
		            ${getNowStreaming(data.result[i].streamingInfo.us)}
		        </div>

		    </div>`

			resultsCard.appendChild(streamingCard);
		};
	});
};


// function renderButtons() {
//     savedSearches.innerHTML = '';
//     const localReadAgain = JSON.parse(localStorage.getItem("historyArray"))
//     if (localReadAgain){
//     for (var i = 0; i < localReadAgain.length; i++) {
//         var pastButton = document.createElement('button');
//         pastButton.textContent = localReadAgain[i];
//         pastButton.addEventListener('click', (e) => {
//             getNowPlaying(e.target.textContent);
//         })
//         savedSearches.prepend(pastButton);
//     }}
// }
function getNowPlaying(searchedMovie){
	let ratingSelected = rangeNumber.value/10;
	console.log(ratingSelected); 
	let releaseYearValue = releaseYear.value
	let Genre = genreDropdown.value;
	console.log(Genre);
	let voteCount = 1;
	let showtimesURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${releaseYearValue}&sort_by=popularity.desc&vote_average.gte=${ratingSelected}&vote_count.gte=100&with_genres=${Genre}`
	// var showtimesURL = `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&vote_average.gte=7&primary_release_year=${releaseYearValue}&overview=/`;
	fetch(showtimesURL, {
		headers: {
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmRlNGViNTc2ZTQxNjY2NzIxZjAxYTcxNGRkNDkwOCIsInN1YiI6IjY0Yzg0NGQxYzA0OGE5MDExY2Q3ZmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gi21mwDNoFGGVyoJeEh7iCgHVuDxTYUNIMzvIDak_7I"
		}
	}).then(function (response) {
		console.log(response)
		return response.json();
	}).then(function (data) {
		console.log(data);
		// saveSearch(data.results[0].title);
		resultsCard.innerHTML = '';
		for (var i = 0; i < data.results.length; i++) {
			console.log(data.results.length)
			if (data.results[i].original_language !== "en") continue;
			movieCard = document.createElement('p');
			movieCard.innerHTML =
			`<div id="movieCard" class="border-2 rounded-2x1 border-red-800 text">
			    <div id="movieImage">
				<img src="https://image.tmdb.org/t/p/original/${data.results[i].poster_path}" class="object-scale-down h-48 w-96"/>
			</div>
			<div id="cardTop">
				<h2>${data.results[i].title}</h2>
				<h2>IMDB Rating: ${data.results[i].vote_average}</h2>
			</div>
			<div id="cardBot">
				<h3>${data.results[i].overview}</h3>
			</div>
		</div>`

			resultsCard.appendChild(movieCard);
		}
	})
}


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

// function getStreaming(streamingInfo){
// 	console.log('streaming info:')
// 	let html = ``
// 	for (const service in streamingInfo){
// 		console.log(`${service}:`, streamingInfo[service])
// 		html += `
// 		<div><a href="${streamingInfo[service][0].link}">${service}</a></div>
// 		`
// 	}
// 	return html
// }

searchButton.addEventListener('click', () => {
	// console.log(releaseYearValue);
	getNowPlaying();
})


// searchButtonRapid.addEventListener("click", () => {
// 	getNowStreaming();
// });

// searchBarRapid.addEventListener("keyup", (event) => {
//     if (event.keyCode === 13) {
//         searchButton.click();
//     }
// });


clearBtn.addEventListener('click', ()=>{
	localStorage.clear();
	renderButtons();
})
