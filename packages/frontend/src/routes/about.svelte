<script lang="ts">
	import { api } from '../lib';
	const { courses } = api;
</script>

<ul>
	{#each Object.values($courses) as course}
		<li>{course.name}</li>
	{/each}
</ul>
