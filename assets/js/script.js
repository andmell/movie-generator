const url = 'https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=movie&genre=18&show_original_language=en&keyword=zombie';
async function getMovie(){
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '427fcc77demsh18662408cbc8325p1efa87jsn99cd4f6001b3',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}
console.log(getMovie());


var showtimesURL = "https://serpapi.com/search.json?q=eternals+theater&location=Austin,+Texas,+United+States&hl=en&gl=us&api_key=83afb6979c20a1b7ef5631e9e767ab94cb94fc554a26d81fa82414416bc07a31";
fetch(showtimesURL).then(function(response){
	return response.json();
}).then(function(data){
	console.log(data);
})


