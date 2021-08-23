import { Offer } from '@planisto/university';
import { coursesFixtures } from '../courses/courses.fixture';
import type { ListFixture } from '../helpers';
import { moduleFixtures } from '../modules/modules.fixture';
import { periodFixture } from '../period/period.fixture';

export const offersFixtures: ListFixture<Offer> = [
	new Offer({
		course: coursesFixtures['CompilerBau'],
		period: periodFixture['summer2020'],
		module: moduleFixtures['vertiefung']
	}),
	new Offer({
		course: coursesFixtures['CompilerBau'],
		period: periodFixture['winter2020/21'],
		module: moduleFixtures['vertiefung']
	}),
	new Offer({
		course: coursesFixtures['DIA'],
		period: periodFixture['summer2020'],
		module: moduleFixtures['spezialisierung']
	})
];
