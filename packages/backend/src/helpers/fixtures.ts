import type { Connection, EntityTarget } from 'typeorm';

/**
 * Fixtures where single items are expected to be accessed individually in tests
 */
export type ObjectFixture<T> = Record<string, T>;

/**
 * Fixtures where single items can not be named easily and are not addressed
 * individually in tests
 */
export type ListFixture<T> = T[];

export type Fixture<T> = ObjectFixture<T> | ListFixture<T>;

export type TypeormFixture<T> = {
	entity: EntityTarget<T>;
	fixture: Fixture<T>;
};

export async function loadFixtures(fixtures: TypeormFixture<any>[], connection: Connection) {
	for (const { entity, fixture } of fixtures) {
		try {
			const repository = connection.getRepository(entity);
			const existingEntries = await repository.count();

			if (existingEntries == 0) await connection.getRepository(entity).save(fixture);
		} catch (e) {
			// @ts-ignore
			console.log(`Failed inserting fixtures for entity ${entity.name}:`, e);
		}
	}
}
