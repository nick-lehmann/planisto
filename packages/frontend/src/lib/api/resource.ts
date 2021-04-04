import type { Entity } from 'typeorm'
import { plainToClass } from 'class-transformer'

export class ApiResource<T> {
	baseHttpOptions: Partial<RequestInit> = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	apiUrl: URL;

	constructor(private readonly endpoint: string, public readonly entity: Entity) {
		this.apiUrl = new URL(endpoint, getApiUrl());
	}

	async request<X>(method: string, path: string, body: Record<string, unknown>): Promise<X> {
		const url = new URL(path, this.apiUrl);
		console.log('Requesting ', url)
		const response = await fetch(url.toString(), { ...this.baseHttpOptions, method, body: method != 'GET' ? JSON.stringify(body) : undefined});
		return await response.json() as Promise<X>;
	}

	async getOne(id: string): Promise<T> {
		const response = await this.request<T>('GET', id, {});
		return plainToClass(this.entity, response)
	}

	async getAll(): Promise<T[]> {
		const response = await this.request<T[]>('GET', '', {});
		return response.map(item => plainToClass(this.entity, item)) as unknown as Promise<T[]>
	}

	async createOne(entity: Partial<T>): Promise<T> {
		const response = this.request<T>('POST', '/', entity);
		return plainToClass(this.entity, response)
	}

	async updateEntity(id: string, entity: Partial<T>): Promise<T> {
		return this.request<T>('PATCH', id, entity);
	}

	async replaceEntity(id: string, entity: Partial<T>): Promise<T> {
		return this.request<T>('PUT', id, entity);
	}

	async deleteEntity(id: string): Promise<void> {
		return this.request('DELETE', id, {});
	}
}

// function concatIds(options) {
// 	if (!options) {
// 		return this.endpoint;
// 	}
// 	return Object.entries(options).reduce((url, [key, id]) => url.replace('{' + key + '}', id.toString()), this.endpoint);
// }

function getApiUrl(): URL {
	if (window.location.hostname.includes('localhost'))
		return new URL('http://localhost:8000');
}
