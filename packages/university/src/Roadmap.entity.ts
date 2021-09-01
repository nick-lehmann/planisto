import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Course } from './Course.entity.js';
import type { Period } from './Period.entity.js';
import type { University } from './University.entity.js';

@Entity()
export class Roadmap {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
	name: string;

	@ManyToOne('University')
	university: University;

	@OneToMany('RoadmapItem', (item: RoadmapItem) => item.roadmap, {
		eager: true,
		cascade: true
	})
	items: RoadmapItem[];

	constructor(init: Partial<Roadmap>) {
		Object.assign(this, init);
	}
}

@Entity()
export class RoadmapItem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne('Roadmap', (roadmap: Roadmap) => roadmap.items)
	roadmap: Roadmap;

	@ManyToOne('Course')
	course: Course;

	@ManyToOne('Period')
	period: Period;

	constructor(init: Omit<RoadmapItem, 'id' | 'roadmap'>) {
		Object.assign(this, init);
	}
}
