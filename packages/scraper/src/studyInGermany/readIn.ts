import { ALL_ENTITIES, Degree, University } from '@planisto/university';
import fs from 'fs/promises';
import { Connection, createConnection, Repository } from 'typeorm';
import { CACHE_PATH } from './cache.js';
import type { SIGResult } from './types.js';
import { SIGDegreeType } from './types.js';

function calculateCredits(type: SIGDegreeType) {
	switch (type) {
		case SIGDegreeType.bachelor:
			return 180;
		case SIGDegreeType.master:
			return 120;
	}
}

async function getEntityMap<T>(repo: Repository<T>, primaryKey: keyof T): Promise<Record<string, T>> {
  const entries = await repo.find()
  return Object.fromEntries(entries.map(entry => [entry[primaryKey], entry]))
}

export async function importDegreesAndUniversities(connection: Connection, cachePath: string) {
	const universityRepo = connection.getRepository<University>(University);
	const degreeRepo = connection.getRepository<Degree>(Degree);

	const cacheContent = await fs.readFile(cachePath, 'utf-8');
	const results: SIGResult[] = JSON.parse(cacheContent);
  
  const universities = await getEntityMap(universityRepo, 'name')
  const degrees = await getEntityMap(degreeRepo, 'name')
  
	for (const result of results) {
    console.debug(result) 
    
		const universityName = result.hsname;
		console.debug(`New university: ${universityName}`);
		let university = await universityRepo.findOne({ where: { name: universityName } });
		if (university === undefined) {
			university = await universityRepo.save(
				new University({
					name: universityName
				})
			);
		}
    
		const degreeName = result.name;
		let degree = await degreeRepo.findOne({ where: { name: degreeName, university: university } });
		if (degree === undefined) {
			console.debug(`New degree: ${degreeName}`);
			degree = await degreeRepo.save(
				new Degree({
					name: result.name,
					totalCredits: calculateCredits(result.abschlussart),
					university
				})
			);
		}
	}
}

const connection = await createConnection({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'planisto',
	password: 'very_secret',
	database: 'planisto',
	synchronize: true,
	entities: ALL_ENTITIES,
	// logging: 'all'
	logging: false
});
await importDegreesAndUniversities(connection, CACHE_PATH);
