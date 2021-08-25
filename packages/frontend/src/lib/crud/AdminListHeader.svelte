<script lang="ts">
	import { capitalize } from '../helpers';
	import type { Sorting } from './sorting';
	import SortingIcon from './components/SortingIcon.svelte';

	export let selectable: boolean = true;
	export let properties: string[] = [];
	export let sorting: Sorting = null;
</script>

<thead>
	<tr>
		{#if selectable}
			<td />
		{/if}
		{#each properties as property}
			<td>
				{capitalize(property)}
				<SortingIcon bind:sortOrder={sorting[property]} />
			</td>
		{/each}
	</tr>
</thead>

<style>
	thead td {
		font-weight: 700;
	}
</style>
