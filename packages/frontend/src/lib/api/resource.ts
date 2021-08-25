/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { plainToClass } from 'class-transformer';
import * as urljoin from 'url-join';
import { ClassStore } from './class.store';

export type IdentifierFunction<T> = (entity: T) => string;
export type Identifier<T> = string | IdentifierFunction<T>;

export class ApiResource<T> extends ClassStore<Record<string, T> | null> {
	baseHttpOptions: Partial<RequestInit> = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	apiUrl: URL;

	constructor(
		private readonly endpoint: string,
		public readonly entity: unknown,
		public readonly identifier: Identifier<T>,
		initial = {}
	) {
		super(initial ? initial : null);
		// this.apiUrl = new URL(endpoint, getApiUrl());
		this.apiUrl = new URL(endpoint);
		console.debug('Resource has api url: ', this.apiUrl);
	}

	async request<X>(method: string, path: string = '', body: Record<string, unknown>): Promise<X> {
		const url = urljoin(this.apiUrl.toString(), path);
		console.debug(`Requesting ${url}`);
		const response = await fetch(url, {
			...this.baseHttpOptions,
			method,
			body: method != 'GET' ? JSON.stringify(body) : undefined
		});
		return (await response.json()) as Promise<X>;
	}

	private getIdentifier(item: T): string {
		if (typeof this.identifier == 'string') return item[this.identifier];
		else return this.identifier(item);
	}

	async getOne(id: string): Promise<T> {
		const response = await this.request<T>('GET', id, {});
		const item = plainToClass(this.entity as any, response) as any as T;
		this.update((items) => {
			const identifier = this.getIdentifier(item);
			items[identifier] = item;
			return items;
		});
		return item;
	}

	private async getAll(): Promise<T[]> {
		const response = await this.request<T[]>('GET', '', {});
		return response.map((item) => plainToClass(this.entity as any, item)) as unknown as T[];
	}

	async load(): Promise<void> {
		const items = await this.getAll();
		this.set(Object.fromEntries(items.map((item) => [this.getIdentifier(item), item])));
	}

	async createOne(entity: Partial<T>): Promise<T> {
		const response = await this.request<T>('POST', '', entity);
		const newItem = plainToClass(this.entity as any, response) as T;
		this.update((items) => {
			items[this.getIdentifier(newItem)] = newItem;
			return items;
		});
		return newItem;
	}

	async updateEntity(id: string, entity: Partial<T>): Promise<T> {
		const response = await this.request<T>('PATCH', id, entity);
		const newItem = plainToClass(this.entity as any, response) as T;
		this.update((items) => {
			items[this.getIdentifier(newItem)] = newItem;
			return items;
		});
		return newItem;
	}

	async replaceEntity(id: string, entity: Partial<T>): Promise<T> {
		const response = await this.request<T>('PUT', id, entity);
		const newItem = plainToClass(this.entity as any, response) as T;
		this.update((items) => {
			items[this.getIdentifier(newItem)] = newItem;
			return items;
		});
		return newItem;
	}

	async deleteEntity(id: string): Promise<void> {
		await this.request('DELETE', id, {});
		this.update((items) => {
			if (id in items) delete items[id];
			return items;
		});
	}
}

// function concatIds(options) {
// 	if (!options) {
// 		return this.endpoint;
// 	}
// 	return Object.entries(options).reduce((url, [key, id]) => url.replace('{' + key + '}', id.toString()), this.endpoint);
// }

function getApiUrl(): URL {
	if (window.location.hostname.includes('localhost')) return new URL('http://localhost:8000');
}
