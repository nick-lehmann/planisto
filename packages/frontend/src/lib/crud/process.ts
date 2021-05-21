/**
 * Processes all items by filtering and sorting them.
 */
import type { Items } from './utils';
import type { Sorting } from './sorting';
import type { Filters } from './filter';
import { multiFilter } from './filter';
import { multiSort } from './sorting';

export type ProcessInput = {
	items: Items
	sorting: Sorting
	filters: Filters
}

export function process(input: ProcessInput): Items {
	const {items, sorting, filters } = input

	const filteredItems = multiFilter(items, filters);
	const sortedItems = multiSort(filteredItems, sorting);

	return sortedItems;
}