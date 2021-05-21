<script lang='ts'>
	import { FilterType } from '../filter';
	import type { Filters, UniqueFilterValues  } from '../filter';

	export let filters: Filters
	export let uniqueValues: UniqueFilterValues

	function resetFilter() {
		for (const filter of Object.values(filters))
			filter.value = null;
	}
</script>

<ul>
	{#each Object.entries(filters) as [property, filter]}
		<li>
			<span>{property}</span>
			{#if filter.type === FilterType.Search}
				<input type='text' placeholder={`Search ${property}`} bind:value={filter.value}>
			{/if}
			{#if filter.type === FilterType.Select}
				<select bind:value={filter.value}>
					<option value='{null}' selected>---</option>
					{#each uniqueValues[property] as value}
						<option value='{value}'>{value}</option>
					{/each}
				</select>
			{/if}
		</li>
	{/each}
</ul>

<button on:click={resetFilter}>Reset filters</button>
