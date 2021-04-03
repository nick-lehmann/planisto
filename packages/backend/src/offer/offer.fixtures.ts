import { Offer } from '@planisto/university';
import { courseFixtures } from '../courses/courses.fixture';
import { periodFixture } from '../period/period.fixture';
import { moduleFixtures } from '../modules/modules.fixture';

export const offerFixtures = [
	new Offer({
		course: courseFixtures['CompilerBau'],
		period: periodFixture['summer2020'],
		modulee: moduleFixtures['vertiefung']
	}),
	new Offer({
		course: courseFixtures['CompilerBau'],
		period: periodFixture['winter2020/21'],
		modulee: moduleFixtures['vertiefung']
	}),
	new Offer({
		course: courseFixtures['DIA'],
		period: periodFixture['summer2020'],
		modulee: moduleFixtures['spezialisierung']
	})
];