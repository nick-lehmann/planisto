import { Period } from '@planisto/university';
import axios from 'axios';
import cacheAdapter from 'axios-cache-adapter';
import * as $ from 'cheerio';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

const { setupCache } = cacheAdapter;

const cache = setupCache({ maxAge: 24 * 60 * 1000 });
const scraper = axios.create({ adapter: cache.adapter });

const YEAR_PLAN_URL =
	'https://tu-dresden.de/studium/im-studium/studienorganisation/studienjahresablauf';

export async function getPeriods(): Promise<Period[]> {
	const periods: Period[] = [];
	const response = await scraper.get(YEAR_PLAN_URL);
	const page = $(response.data);

	const years = $(page).find('.accordion-item');
	console.log(years);

	for (const year in years) {
		// @ts-ignore
		const name = $(year).find('a').textContent;

		// @ts-ignore
		const timelineText = $(year).find('p');
		const match = /(?<start>.*)\suntil\s(?<end>.*)/g.exec(timelineText);

		const start = dayjs(match.groups.start, 'DD.MM.YYYY').toDate();
		const end = dayjs(match.groups.end, 'DD.MM.YYYY').toDate();

		periods.push(
			new Period({
				name,
				start,
				end
			})
		);
	}

	return periods;
}

const periods = await getPeriods();
console.log(periods);
