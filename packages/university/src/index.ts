// import 'reflect-metadata'
import { Course } from './Course.entity.js';
import { Degree } from './Degree.entity.js';
import { Department } from './Department.entity.js';
import { Enrollment } from './Enrollment.entity.js';
import { Extent } from './Extent.js';
import { Faculty } from './Faculty.entity.js';
import { Module } from './Module.entity.js';
import { Offer } from './Offer.entity.js';
import { Period } from './Period.entity.js';
import { Roadmap, RoadmapItem } from './Roadmap.entity.js';
import { Student } from './Student.entity.js';
import { University } from './University.entity.js';

export const ALL_ENTITIES = [
	Course,
	Degree,
	Department,
	Faculty,
	Module,
	Offer,
	Period,
	Roadmap,
	RoadmapItem,
	Student,
	University
];

export {
  Course,
  Degree,
  Department,
  Enrollment,
  Extent,
  Faculty,
  Module,
  Offer,
  Period,
  Roadmap,
  RoadmapItem,
  Student,
  University,
};
