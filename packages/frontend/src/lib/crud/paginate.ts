import type { Items } from './utils';

export function paginate(items: Items, pageSize: number, currentPage: number) {
	return Object.fromEntries(Object.entries(items).slice(currentPage * pageSize, (currentPage + 1) * pageSize))
}