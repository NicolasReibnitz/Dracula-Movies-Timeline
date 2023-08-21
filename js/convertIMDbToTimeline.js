// Input:
// {
// 		"Position": "1",
// 		"Const": "tt0013442",
// 		"Created": "2023-06-08",
// 		"Modified": "2023-06-08",
// 		"Description": "",
// 		"Title": "Nosferatu, eine Symphonie des Grauens",
// 	"URL": "https://www.imdb.com/title/tt0013442/",
// 	"Title Type": "movie",
// 		"IMDb Rating": "7.9",
// 		"Runtime (mins)": "94",
// 		"Year": "1922",
// 		"Genres": "Fantasy, Horror",
// 		"Num Votes": "101737",
// 	"Release Date": "1922-02-16",
// 	"Directors": "F.W. Murnau",
// 	"Your Rating": "",
// 	"Date Rated": ""
// }

// Output:
// "events": [
// 	{
// 		"media": {
// 			"url": "{{ static_url }}/img/examples/houston/family.jpg",
// 			"caption": "Houston's mother and Gospel singer, Cissy Houston (left) and cousin Dionne Warwick.",
// 			"credit": "Cissy Houston photo:<a href='http://www.flickr.com/photos/11447043@N00/418180903/'>Tom Marcello</a><br/><a href='http://commons.wikimedia.org/wiki/File%3ADionne_Warwick_television_special_1969.JPG'>Dionne Warwick: CBS Television via Wikimedia Commons</a>"
// 		},
// 		"start_date": {
// 			"month": "8",
// 			"day": "9",
// 			"year": "1963"
// 		},
// 		"text": {
// 			"headline": "A Musical Heritage",
// 			"text": "<p>Born in New Jersey on August 9th, 1963, Houston grew up surrounded by the music business. Her mother is gospel singer Cissy Houston and her cousins are Dee Dee and Dionne Warwick.</p>"
// 		}
// 	},
// 	...
// ]

function convertIMDbToTimeline(json1, json2) {
	const events = [];
	json1.forEach((info, index) => {
		const moarInfo = findMovieByCode(info.Const, json2);
		const event = {
			media: {
				url: './posters/' + info.Const + '.jpg',
				caption: info.Title,
				credit: ''
			},
			start_date: {
				month: '',
				day: '',
				year: info.Year
			},
			text: {
				headline: info.Title,
				text: getBodyText(info, moarInfo)
			}
		};
		events.push(event);
	});
	return { events };
}

function getBodyText(info, moarInfo) {
	const firstLine = `<small>${moarInfo.rating} | ${info['Runtime (mins)']}min | ${info.Genres}</small><br />`;
	const secondLine = `⭐️ ${info['IMDb Rating']}<br /><br />`;
	const body = `${moarInfo.description}`;
	return firstLine + secondLine + body;
}

function findMovieByCode(code, list) {
	return list.find(movie => movie.code === code);
}

export default convertIMDbToTimeline;
