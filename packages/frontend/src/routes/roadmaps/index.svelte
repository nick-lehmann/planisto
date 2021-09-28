<script lang="ts">
	import { api } from '../../lib';

	const { roadmaps } = api;
</script>

<ul>
	{#each Object.values($roadmaps) as roadmap}
		<li><a href="/roadmaps/{roadmap.name}">{roadmap.name}</a></li>
	{/each}
</ul>
