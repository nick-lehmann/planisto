import { Module } from '@planisto/university';
import axios from 'axios';
import cacheAdapter from 'axios-cache-adapter';
import { JSDOM } from 'jsdom';
import { CourseTable } from './CourseTable.js';
const { setupCache } = cacheAdapter;

const links = [
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-bas1/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-bas2/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-bas3/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-bas4/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-bas5/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-bas6/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-bas7/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-vert1/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-vert2/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-vert3/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-vert4/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-vert5/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-vert6/schedule',
	'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2122/modules/inf-vert7/schedule'
];

function getModuleLinks(): String[] {
	const modules: String[] = [];
	for (let year = 17; year <= 21; year++) {
		for (let module = 1; module <= 7; module++) {
			for (const semester of [`sose${year}`, `wise${year}${year + 1}`])
				modules.push(
					`https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/${semester}/modules/inf-vert${module}/schedule`
				);
		}
	}
	return modules;
}
const modules = [];
const moduleLinks = getModuleLinks();

const cache = setupCache({ maxAge: 24 * 60 * 1000 });
const scraper = axios.create({ adapter: cache.adapter });

const link = links[0];
console.log(moduleLinks);
// const module = await coursesOfModule(link);
// console.log(module);

export async function coursesOfModule(moduleUrl: string): Promise<Module> {
	const module = new Module({});
	const response = await scraper.get(moduleUrl);
	const document = new JSDOM(response.data).window.document;
	const moduleTableBodies = document.querySelectorAll('table');

	if (moduleTableBodies.length > 1) {
		const childrenHeadings = document.querySelectorAll('h4');
		for (let i = 0; i < moduleTableBodies.length; i++) {
			const name = childrenHeadings[i].textContent.trim();
			// console.log('Create new child module:', name);
			const childModule = new Module({
				name,
				possibleCourses: new CourseTable(moduleTableBodies[i]).parse()
			});
			module.children = module.children ? [childModule, ...module.children] : [childModule];
		}
	} else {
		module.possibleCourses = new CourseTable(moduleTableBodies[0]).parse();
	}
	return module;
}
