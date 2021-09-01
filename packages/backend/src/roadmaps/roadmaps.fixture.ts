import { Roadmap, RoadmapItem } from '@planisto/university';
import { coursesFixtures } from '../courses/courses.fixture.js';
import type { ObjectFixture } from '../helpers/index.js';
import { periodFixture } from '../period/period.fixture.js';
import { universityFixture } from '../university/index.js';

export const roadmapsFixtures: ObjectFixture<Roadmap> = {
	standard: new Roadmap({
		name: 'Standard',
		university: universityFixture['tu-dresden'],
		items: [
			new RoadmapItem({
				course: coursesFixtures['CompilerBau'],
				period: periodFixture['summer2020']
			}),
			new RoadmapItem({
				course: coursesFixtures['DIA'],
				period: periodFixture['winter2020/21']
			})
		]
	})
};
