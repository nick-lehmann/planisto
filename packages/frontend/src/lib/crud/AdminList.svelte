<script lang="ts">
	import { LinkWrapper, Pagination } from '../components';
	import type { ApiResource } from '../api/resource';
	import { getInitialSorting } from './sorting';
	import type { Formatters, ItemLink } from './display';
	import { display } from './display';
	import type { Filters } from './filter';
	import { FilterType, findUniqueValues } from './filter';
	import { paginate } from './paginate';
	import type { Items } from './utils';
	import SortingIcon from './components/SortingIcon.svelte';
	import FilterMenu from './components/FilterMenu.svelte';
	import { process } from './process';

	export let properties: string[] = [];
	export let resource: ApiResource<unknown>;

	export let formatters: Formatters = null;
	export let sorting = getInitialSorting(properties, resource);
	export let filters: Filters = {
		name: { type: FilterType.Search },
		teachers: { type: FilterType.Select }
	};

	export let currentPage = 0;
	export let pageSize = 10;
	export let itemLink: ItemLink;
	export let selectable = true;

	let allItems: Items;
	$: allItems = $resource;

	let items: Items;
	$: items = process({ items: allItems, sorting, filters });
	$: displayedItems = paginate(items, pageSize, currentPage);

	let selected = {};
	let selectCount: number;
	$: selectCount = Object.values(selected).filter((x) => x).length;

	let totalItems: number, totalPages: number;
	$: totalItems = Object.keys(allItems).length;
	$: totalPages = Math.ceil(totalItems / pageSize);

	let uniqueValues: Record<string, unknown[]>;
	$: uniqueValues = findUniqueValues(allItems, filters);

	// Debug
	$: console.log('Current state of admin:', {
		sorting,
		filters,
		uniqueValues,
		totalItems,
		totalPages,
		selected
	});
</script>

<div class="admin-list">
	<main>
		<table>
			<thead>
				<tr>
					{#if selectable}
						<td />
					{/if}
					{#each properties as property}
						<td>
							{property}
							<SortingIcon bind:sortOrder={sorting[property]} />
						</td>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each Object.entries(displayedItems) as [identifier, item]}
					<tr>
						{#if selectable}
							<td>
								<input type="checkbox" bind:checked={selected[identifier]} />
							</td>
						{/if}
						{#each properties as property, index}
							<td>
								<LinkWrapper wrap={index === 0} link={encodeURI(itemLink(item))}>
									<p>{display(item, property, formatters)}</p>
								</LinkWrapper>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</main>

	<aside class="sidebar">
		<a href="/courses/new">Add new</a>

		<h3>Filters</h3>
		<FilterMenu bind:filters bind:uniqueValues />
		<p>Selected {selectCount} items</p>
		<button on:click={() => (selected = {})}>Reset Selection</button>
	</aside>
</div>

<p>Showing {Object.keys(items).length} items of {totalItems}</p>
<Pagination bind:total={totalPages} bind:current={currentPage} />

<style>
	.admin-list {
		display: grid;
		grid-template-columns: 85% 15%;
	}
	td {
		margin-bottom: 5px;
		padding: 0 5px;
	}
</style>
