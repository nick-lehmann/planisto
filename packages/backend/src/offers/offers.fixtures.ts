import { Offer } from '@planisto/university';
import { coursesFixtures } from '../courses/courses.fixture.js';
import type { ListFixture } from '../helpers/index.js';
import { moduleFixtures } from '../modules/modules.fixture.js';
import { periodFixture } from '../period/period.fixture.js';

export const offersFixtures: ListFixture<Offer> = [
	new Offer({
		course: coursesFixtures['CompilerBau'],
		period: periodFixture['summer2020'],
		modulee: moduleFixtures.vertiefung
	}),
	new Offer({
		course: coursesFixtures['CompilerBau'],
		period: periodFixture['winter2020/21'],
		modulee: moduleFixtures.vertiefung
	}),
	new Offer({
		course: coursesFixtures['DIA'],
		period: periodFixture['summer2020'],
		modulee: moduleFixtures.spezialisierung
	})
];
