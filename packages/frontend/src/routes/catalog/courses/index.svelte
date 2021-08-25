<script lang="ts">
	import { AdminList, api, FilterType } from '../../../lib';
	import type { Filters } from '../../../lib';
	import type { Course } from '@planisto/university';
	import { onMount } from 'svelte';

	let loading = null;
	const properties: (keyof Course)[] = ['name', 'teachers', 'extent', 'institute'];
	const newUrl = 'courses/new';

	onMount(() => {
		loading = api.courses.load();
	});

	const filters: Filters = {
		name: { type: FilterType.Search },
		teachers: { type: FilterType.Select }
	};

	const itemLink = (course: Course) => `/catalog/courses/${course.name}`;
</script>

{#if loading}
	{#await loading}
		<p>Loading...</p>
	{:then body}
		<AdminList {properties} {filters} resource={api.courses} {itemLink} {newUrl} />
	{:catch e}
		<p>Error {e}</p>
	{/await}
{/if}
