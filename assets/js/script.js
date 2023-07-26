const url = `https://ott-details.p.rapidapi.com/advancedsearch?start_year=1970&end_year=2020&min_imdb=6&max_imdb=7.8&genre=action&language=english&type=movie&sort=latest&page=1`;
testButton = document.querySelector('#searchbtn')
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '08ca5b0de3msh6490e34459cdf81p153300jsnd7bf5fad964d',
        'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
    }
};

async function logMovies() {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

testButton.addEventListener('click', () => {
    logMovies();
})

const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("secret_api_key");

const params = {
    q: "AMC Barton Creek Square 14",
    location: "Austin, Texas, United States",
    hl: "en",
    gl: "us"
};

const callback = function (data) {
    console.log(data["showtimes"]);
};

// Show result as JSON
search.json(params, callback);