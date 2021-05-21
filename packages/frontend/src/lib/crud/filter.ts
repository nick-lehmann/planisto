import type { Items, Property } from './utils';

export enum FilterType { Select, Search, Boolean }

interface BaseFilter {
	readonly type: FilterType
}

interface SearchFilter extends BaseFilter {
	readonly type: FilterType.Search
	value?: string | null
}

interface SelectFilter extends BaseFilter {
	readonly type: FilterType.Select
	value?: unknown | null	// TODO: Make multiple values available here
}

interface BooleanFilter extends BaseFilter {
	readonly type: FilterType.Boolean
	value?: boolean | null
}

export type Filter = SearchFilter | SelectFilter | BooleanFilter
export type Filters = Record<Property, Filter>
export type UniqueFilterValues = Record<Property, unknown[]>

export function findUniqueValues(items: Items, filters: Filters): UniqueFilterValues {
	return Object.fromEntries(
		Object.entries(filters)
			.filter(([property, filter]) => filter.type === FilterType.Select)
			.map(([property, filter]) => {
				const allValues = Object.values(items).map(item => item[property]).flat();
				const set = new Set(allValues) as Iterable<unknown>;
				return [property, Array.from(set)];
			})
	);
}

/**
 * Filter all items according to a multitude of filter criteria
 */
export function multiFilter(items: Items, filters: Filters): Items {
	// Only consider filters for which a value is specified
	const properties = Object.entries(filters).filter(([property, filter]) => filter.value);
	const entries = Object.entries(items)

	const filteredEntries = entries.filter(
		([identifier, item]) =>
			properties.map(([property, filter]) => {
				const value = item[property];

				switch (filter.type) {
					case FilterType.Search: {
						return typeof value == 'string' ? value.includes(filter.value) : true;
					}
					case FilterType.Select: {
						if (typeof value in ['number', 'string']) return value === filter.value;
						if (Array.isArray(value)) return value.includes(filter.value);
						return true;
					}
					default:
						return true;
				}
			}).every(element => element === true)
	);

	return Object.fromEntries(filteredEntries);
}