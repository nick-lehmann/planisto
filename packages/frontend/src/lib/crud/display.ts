import type { Property } from './utils';

export type ItemLink = (key: unknown) => string
export type Formatter = (value: unknown) => string
export type Formatters = Record<string, Formatter> | null

export function display(item: unknown, property: Property, formatters: Formatters): string {
	const value = item[property];
	switch (typeof value) {
		case 'string':
			return value;
		case 'object':
			return formatters && property in formatters
				? formatters[property](value)
				: value.toString();
		default: {
			console.error(item)
			throw Error(`Cannot get display representation for property ${property} of type ${typeof value} for item: ${item}`);
		}

	}
}
