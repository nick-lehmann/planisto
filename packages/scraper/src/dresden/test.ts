import { Module, Period, University } from '@planisto/university';
import axios, { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { CourseTable } from './CourseTable';

console.clear();

type DegreeOverview = {
	name: string;
	moduleLinks: ModuleLink[];
};

type ModuleLink = {
	name: string;
	url: string;
};

type SemesterLink = {
	semester: Period;
	url: string;
};

const TUDresden = new University({});

class TUDresdenScraper {
	scraper: AxiosInstance;
	baseUrl = 'https://wwwdek.inf.tu-dresden.de';

	constructor() {
		const cache = setupCache({ maxAge: 24 * 60 * 1000 });
		this.scraper = axios.create({ adapter: cache.adapter });
	}

	async go(): Promise<void> {
		const degreeOverviews = await this.modulesOfDegree(
			'https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/wise2021/modules/index/courses/de'
		);
		for (const degreeOverview of degreeOverviews) {
			console.log('Scraping degree:', degreeOverview.name);
			const modules = [];
			for (const moduleLink of degreeOverview.moduleLinks) {
				console.log('Scraping module link:', moduleLink);
				try {
					const module = await this.coursesOfModule(this.baseUrl + moduleLink.url);
					module.name = moduleLink.name;
					modules.push(module);
				} catch (e) {
					console.log(e);
				}
			}
			writeFileSync(`./assets/${degreeOverview.name}.json`, JSON.stringify(modules), 'utf-8');
		}
		// await this.scrapeCoursesOfModule('https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/sose20/modules/inf-b-510/courses')
		// await this.scrapeCoursesOfModule('https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/sose20/modules/inf-b-610/courses')
	}

	async parseCatalog(): Promise<SemesterLink[]> {
		const response = await this.scraper.get(
			'https://tu-dresden.de/ing/informatik/studium/lehre/lehrangebotskataloge'
		);
		const document = new JSDOM(response.data).window.document;
		return Array.from(document.querySelectorAll('tr td:nth-child(1)').values()).map((cell) => {
			return {
				semester: parseSemesterString(cell.textContent.trim()),
				// @ts-ignore
				url: cell.querySelector('a').attributes['href'].value
			};
		});
	}

	/**
	 * Find all modules for a certain degree.
	 * @param url
	 */
	async modulesOfDegree(url: string): Promise<DegreeOverview[]> {
		const $ = await this.load(url);

		const degree: DegreeOverview[] = [];

		const degreeHeadlines = Array.from($('h3.header'));
		const moduleLists = Array.from($('h3.header + ul'));

		for (let i = 3; i < 4; i++) {
			const headline = degreeHeadlines[i];
			// @ts-ignore
			const degreeName = headline.children[0].data;

			const moduleLinks = Array.from($(moduleLists[i]).find('a')).map((link) => {
				return {
					// @ts-ignore
					name: link.children[0].data,
					// @ts-ignore
					url: link.attribs['href']
				};
			});
			console.log(`Degree: ${degreeName}`);
			console.log('Links to modules:', moduleLinks);

			degree.push({
				name: degreeName,
				moduleLinks
			});
		}

		return degree;
	}

	/**
	 * Example module url:
	 * - Module with no children: https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/sose20/modules/inf-b-120/courses
	 * - Module with two children: https://wwwdek.inf.tu-dresden.de/mole-web/catalogs/sose20/modules/inf-b-610/courses
	 * @param moduleUrl
	 */
	async coursesOfModule(moduleUrl: string): Promise<Module> {
		const module = new Module({});
		const response = await this.scraper.get(moduleUrl);
		const document = new JSDOM(response.data).window.document;
		const moduleTableBodies = document.querySelectorAll('table');

		if (moduleTableBodies.length > 1) {
			const childrenHeadings = document.querySelectorAll('h4');
			for (let i = 0; i < moduleTableBodies.length; i++) {
				const name = childrenHeadings[i].textContent.trim();
				console.log('Create new child module:', name);
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

	// @ts-ignore
	async load(url: string): Promise<CheerioStatic> {
		const response = await this.scraper.get(url);
		return cheerio.load(response.data);
	}
}

const scraper = new TUDresdenScraper();
await scraper.go();
