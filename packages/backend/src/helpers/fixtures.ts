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

export async function loadFixtures(
	fixtures: TypeormFixture<any>[],
	connection: Connection
): Promise<Fixture<any>> {
	for (let fixtureIndex = 0; fixtureIndex < fixtures.length; fixtureIndex++) {
		const { entity, fixture } = fixtures[fixtureIndex];
		try {
			const repository = connection.getRepository(entity);
			const existingEntries = await repository.count();

			if (existingEntries > 0) return;

			if (Array.isArray(fixture))
				fixtures[fixtureIndex] = {
					entity,
					fixture: await repository.save(fixture)
				};
			else {
				const fixtureEntries = Object.entries(fixture);
				const savedEntries = await repository.save(fixtureEntries.map(([_, value]) => value));
				const newFixture = Object.fromEntries(
					fixtureEntries.map(([identifier, rawValue], index) => [identifier, savedEntries[index]])
				);

				fixtures[fixtureIndex] = { entity, fixture: newFixture };
			}
		} catch (e) {
			// @ts-ignore
			console.log(`Failed inserting fixtures for entity ${entity.name}:`, e);
		}
	}
}
