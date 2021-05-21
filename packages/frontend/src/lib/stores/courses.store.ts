import { writable } from 'svelte/store'
import type { Course } from '@planisto/university';
import type { ApiResource } from '../api/resource';
import { api } from '../api';

// function createDictApiStore<T>(resource: ApiResource<T>, primaryKey: string) {
// 	const { subscribe, set, update } = writable([])
//
// 	let loaded = false
//
// 	async function createEntry(entity: T): Promise<T> {
// 		return resource.createOne(entity)
// 	}
//
// 	async function updateEntry(id: string, entity: T): Promise<T> {
// 		return resource.updateEntity(id, entity)
// 	}
//
// 	async function replaceEntry(id: string, entity: T): Promise<T> {
// 		return resource.replaceEntity(id, entity)
// 	}
//
// 	async function removeEntry(id: string): Promise<void> {
// 		return resource.deleteEntity(id)
// 	}
//
// 	return {
// 		subscribe,
// 		set,
// 		update,
// 		load: async () => {
// 			new Promise((resolve, reject) => {
// 				console.debug(`Loading items for resource ${resource.apiUrl}`)
// 				const itemPromise = resource.getAll()
// 				itemPromise.then((items) => {
// 					set(Object.fromEntries(items.map(item => [item[primaryKey], item])))
// 					loaded = true
// 					resolve()
// 					console.debug(`Done loading items for resource ${resource.apiUrl}`, { items })
// 				}).catch((error) => {
// 					console.error(`Failed loading items for resoruce ${resource.apiUrl}:`, error)
// 					reject()
// 				})
// 			})
// 		},
// 		createEntry,
// 		updateEntry,
// 		replaceEntry,
// 		removeEntry
// 	}
// }

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

// export const courses = createDictApiStore<Course>(api.courses, "name")
export const courses = null