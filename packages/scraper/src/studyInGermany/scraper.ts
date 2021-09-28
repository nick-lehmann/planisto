import axios, { AxiosInstance } from 'axios';
import fs from 'fs/promises';
import { CACHE_PATH } from './cache';
import type { SIGResponse, SIGResult } from './types';

const scraper = axios.create();

async function fetchSinglePage(client: AxiosInstance, page: number): Promise<SIGResult[]> {
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
const results: SIGResult[] = [];
const sleepBetweenBatches = 3000;

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

for (let page = 1; page <= lastPage; page += requestsInParallel) {
	const requests: Promise<SIGResult[]>[] = [];
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
	await fs.writeFile(CACHE_PATH, JSON.stringify(results, null, 4));
}
