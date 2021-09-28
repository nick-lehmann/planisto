/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Course, Module, Period, Roadmap } from '@planisto/university';
import { plainToClass } from 'class-transformer';
import type { Subscriber, Unsubscriber, Updater, Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';
import * as urljoin from 'url-join';
import type { Identifier } from '../crud';

export type Dictionary<T> = Record<string, T> | null;

const ongoingRequests = writable(0);
export const loading = derived(ongoingRequests, ($ongoingRequests) => $ongoingRequests > 0);

export class ApiResource<T> {
	private readonly store: Writable<Dictionary<T>>;
	private readonly apiUrl: URL;
	private readonly baseHttpOptions: Partial<RequestInit> = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	initialised: boolean = false;

	constructor(
		endpoint: string,
		public readonly entity: unknown,
		public readonly identifier: Identifier<T>,
		initial: Dictionary<T> = null
	) {
		this.store = writable(initial);
		this.initialised = Boolean(initial);
		this.apiUrl = new URL(endpoint);
	}

	private async request<X>(
		method: string,
		path: string = '',
		body: Record<string, unknown>
	): Promise<X> {
		const url = urljoin(this.apiUrl.toString(), path);
		ongoingRequests.update((n) => n + 1);
		const response = await fetch(url, {
			...this.baseHttpOptions,
			method,
			body: method != 'GET' ? JSON.stringify(body) : undefined
		});
		ongoingRequests.update((n) => n - 1);
		return (await response.json()) as Promise<X>;
	}

	private getIdentifier(item: T): string {
		if (typeof this.identifier == 'string') return item[this.identifier];
		else return this.identifier(item);
	}

	async get(identifier: string): Promise<T> {
		const response = await this.request<T>('GET', identifier, {});
		return plainToClass(this.entity as any, response);
	}

	async getAll(): Promise<T[]> {
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

	/**
	 * Store implementation
	 */
	set = (new_value: Dictionary<T>): void => this.store.set(new_value);
	update = (fn: Updater<Dictionary<T>>): void => this.store.update(fn);

	subscribe(run: Subscriber<Dictionary<T>>): Unsubscriber {
		if (!this.initialised) {
			this.set({});
			this.load();
		}
		return this.store.subscribe(run);
	}

	snapshot(): Dictionary<T> {
		const value = null;
		// this.subscribe((data) => (value = data))();
		return value;
	}
}

export class PlanistoAPI {
	courses = new ApiResource<Course>('http://localhost:8000/courses', Course, 'name');
	modules = new ApiResource<Module>('http://localhost:8000/modules', Module, 'name');
	roadmaps = new ApiResource<Roadmap>('http://localhost:8000/roadmaps', Roadmap, 'id');
	periods = new ApiResource<Period>('http://localhost:8000/periods', Period, 'id');
}

export const api = new PlanistoAPI();
