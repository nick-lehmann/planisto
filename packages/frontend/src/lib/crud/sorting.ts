import type { Items, Property } from './utils';
import type { ApiResource } from '../api/resource';

export enum SortDirection { ASC = 'ASC', DESC = 'DESC' }

export type SortOrder = SortDirection | null
export type Sorting = Record<Property, SortOrder | null>

export function getInitialSorting(properties: Property[], resource: ApiResource<unknown>): Sorting {
	return Object.fromEntries(
		properties.map(property => [property, property == resource.identifier ? SortDirection.ASC : null]));
}

export function toggleSorting(sortOrder: SortOrder): SortOrder {
	return {
		null: SortDirection.ASC,
		[SortDirection.ASC]: SortDirection.DESC,
		[SortDirection.DESC]: null
	}[sortOrder];
}

export function multiSort(items: Items, sorting: Sorting): Items {
	const entries = Object.entries(items)

	const sortedEntries = entries.sort(([identifier1, item1], [identifier2, item2]) => {
		for (const [property, sortOrder] of Object.entries(sorting)) {
			if (!sortOrder) continue;
			const value1 = item1[property];
			const value2 = item2[property];

			switch (sortOrder) {
				case SortDirection.ASC: {
					if (value1 > value2) return 1;
					if (value1 < value2) return -1;
					break;
				}
				case SortDirection.DESC: {
					if (value1 > value2) return -1;
					if (value1 < value2) return 1;
					break;
				}
				default:
					break;
			}
			return 0;
		}
	})

	return Object.fromEntries(sortedEntries)
}