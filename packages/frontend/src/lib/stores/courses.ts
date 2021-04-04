import { writable } from 'svelte/store'
import type { Course, Extent } from '@planisto/university';
import type { ApiResource } from '../api/resource';
import { api } from '../api';

function createApiStore<T>(resource: ApiResource<T>) {
	const { subscribe, set, update } = writable([])

	let loaded = false

	return {
		subscribe, set, update, load: async () => {
			new Promise((resolve, reject) => {
				console.debug(`Loading items for resource ${resource.apiUrl}`)
				const itemPromise = resource.getAll()
				itemPromise.then((items) => {
					set(items)
					loaded = true
					resolve()
					console.debug(`Done loading items for resource ${resource.apiUrl}`, { items })
				}).catch((error) => {
					console.error(`Failed loading items for resoruce ${resource.apiUrl}:`, error)
					reject()
				})
			})
		}
	}
}

// export const courses = writable([
// 	new Course({
// 		name: 'Programming for Data Science',
// 		extent: new Extent({ lecture: 2, exercise: 2, practical: 0}),
// 		exam: 'M(90)',
// 		teachers: ['Dr. Thiele'],
// 		languages: ['de', 'en'],
// 	}),
// 	new Course({
// 		name: 'Compiler Construction',
// 		extent: new Extent({ lecture: 2, exercise: 2, practical: 0}),
// 		exam: 'M(90)',
// 		teachers: ['Prof. Castrillon'],
// 		languages: ['en']
// 	}),
// ])

export const courses = createApiStore<Course>(api.courses)