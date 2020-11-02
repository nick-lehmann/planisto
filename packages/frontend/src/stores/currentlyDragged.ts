import { writable } from 'svelte/store';

const currentlyDraggedCourse = writable(null);

export default currentlyDraggedCourse