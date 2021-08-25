<script lang="ts">
	import { FilterType } from '../filter';
	import type { Filters, UniqueFilterValues } from '../filter';
	import { capitalize } from '../../helpers';

	export let filters: Filters;
	export let uniqueValues: UniqueFilterValues;

	function resetFilter() {
		filters = Object.fromEntries(
			Object.entries(filters).map(([property, filter]) => [property, { ...filter, value: null }])
		);
	}
</script>

<ul>
	{#each Object.entries(filters) as [property, filter]}
		<li>
			<span class="filter-name">{capitalize(property)}</span>
			{#if filter.type === FilterType.Search}
				<input type="text" placeholder={`Search ${property}`} bind:value={filter.value} />
			{/if}
			{#if filter.type === FilterType.Select}
				<select bind:value={filter.value}>
					<option value={null} selected>---</option>
					{#each uniqueValues[property] as value}
						<option {value}>{value}</option>
					{/each}
				</select>
			{/if}
		</li>
	{/each}
</ul>

{#if Object.values(filters).some((filter) => filter.value != '' && filter.value != null)}
	<button on:click={resetFilter}>Reset filters</button>
{/if}

<style>
	ul {
		padding-left: 0;
	}
	li {
		list-style: none;
	}

	.filter-name::first-letter {
		text-transform: capitalize;
	}
</style>
