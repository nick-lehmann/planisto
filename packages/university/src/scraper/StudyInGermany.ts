import axios, { AxiosInstance } from 'axios';
import fs from 'fs/promises';

const scraper = axios.create();

interface SIGResponse {
	num: Num;
	results: Result[];
	pagebar: Pagebar;
	numName: string;
	numNameShort: string;
	translations: Translations;
}

interface Translations {
	abschluss: string;
	studiengebuehren: string;
	kurssprache: string;
	zulassungssemester: string;
	keinergebnis: string;
}

interface Pagebar {
	page: number;
	epp: number;
	num: number;
}

interface Result {
	uniqueId: string;
	id: string;
	typ: string;
	name: string;
	orderName: string;
	hsname: string;
	standort: string;
	hsStandort: string;
	abschlussart: string;
	studienentgeltBetrag: string;
	studienentgeltEinheit: string;
	studienentgeltBemerkung: string;
	studienentgeltLink: string;
	zulassungssemester: string;
	hauptsprache: string;
	studienEntgeltNone?: string;
	studienentgeltHinweis: string;
	linkid: string;
	waehrung?: string;
}

interface Num {
	num: string;
	numName: string;
	numNameShort: string;
}

async function fetchSinglePage(client: AxiosInstance, page: number): Promise<Result[]> {
	console.log(`Fetching page ${page}`);
	const response = await client.post(
		'https://www2.daad.de/ajax/hsk/result/ad8xa39c3xy2ffpxbbbcq31eu19cxv56/en/',
		{
			page
		}
	);
	return (response.data as SIGResponse).results;
}

let totalResults = 21036;
// let totalResults = 25;
const resultsPerPage = 10;
const requestsInParallel = 5;
const lastPage = Math.ceil(totalResults / resultsPerPage);
const cachePath = '/Users/nick/Projekte/Planisto/packages/university/src/scraper/cache.json';
const results: Result[] = [];
const sleepBetweenBatches = 3000;

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

for (let page = 1; page <= lastPage; page += requestsInParallel) {
	const requests: Promise<Result[]>[] = [];
	for (
		let currentPage = page, offset = 0;
		offset < requestsInParallel && currentPage <= lastPage;
		currentPage++, offset++
	) {
		console.log(`Create request for page ${currentPage}`);
		requests.push(fetchSinglePage(scraper, currentPage));
	}

	const responses = await Promise.all(requests);
	const newResults = responses.reduce((a, b) => a.concat(b), []);
	console.log(`Found ${newResults.length} new results`);
	results.push(...newResults);

	await sleep(sleepBetweenBatches);
	await fs.writeFile(cachePath, JSON.stringify(results, null, 4));
}
