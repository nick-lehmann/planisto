<script lang="ts">
	import { AdminList, courses } from '../../lib';
	import type { Course } from '@planisto/university';
	import { onMount } from 'svelte';

	let loading = null;

	onMount(() => {
		console.log('Mounted');
		loading = courses.load();
	});

	const itemLink = (course: Course) => `/courses/${course.name}`;
</script>

<h1>Courses</h1>

{#if loading}
	{#await loading}
		<p>Loading...</p>
	{:then body}
		<AdminList
			properties={['name', 'teachers', 'extent', 'institute']}
			resource={courses}
			{itemLink}
		/>
	{:catch e}
		<p>Error {e}</p>
	{/await}
{/if}
