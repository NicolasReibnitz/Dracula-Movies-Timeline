import { Timeline } from '@knight-lab/timelinejs';
import csv from 'csvtojson';

import exampleJson from './data/example.json';
import imdbList from './data/Marianna & Nicolas at the Monsters Dracula.csv?raw';
import convertIMDbToTimeline from './js/convertIMDbToTimeline';
import imdbListMoar from './public/imdb-info.tsv?raw';

import '@knight-lab/timelinejs/dist/css/timeline.css';
import './style.scss';

console.log('exampleJson: ', exampleJson);

const imdbListMoarTSV = await csv({ delimiter: '\t' }).fromString(imdbListMoar);
console.log('imdbListMoarTSV: ', imdbListMoarTSV);

csv(/* { delimiter: '\t' } */)
	.fromString(imdbList)
	.then(jsonObj => {
		console.log(jsonObj);
		const result = convertIMDbToTimeline(jsonObj, imdbListMoarTSV);
		console.log('result: ', result);

		const timeline = new Timeline(
			'app',
			result
			// 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZsxoX6EKemv8XxUCBq8jn2pgPEXrw4ln1acbvmALfgq41HLSWw8x22YUlT3uXn7Arpdh9QkPeI6H6/pubhtml'
		);

		console.log('timeline: ', timeline);
	});
