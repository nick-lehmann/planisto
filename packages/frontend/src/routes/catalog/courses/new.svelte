<script lang="ts">
	import { CourseForm, api } from '../../../lib';
	import { Course } from '@planisto/university';
	import { goto } from '$app/navigation';

	const listUrl = '/catalog/courses';

	let course = new Course({});
	async function save() {
		api.courses.createOne(course);
		await goto(listUrl);
	}
</script>

<a href={listUrl}>Back</a>
<CourseForm bind:course on:submit={save} />
