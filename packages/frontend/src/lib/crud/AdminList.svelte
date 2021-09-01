<script lang="ts">
	import type { ApiResource } from '../stores';
	import { Pagination } from '../components';
	import AdminListEntry from './AdminListEntry.svelte';
	import AdminListHeader from './AdminListHeader.svelte';
	import FilterMenu from './components/FilterMenu.svelte';
	import type { Formatters, ItemLink } from './display';
	import type { Filters } from './filter';
	import { findUniqueValues } from './filter';
	import { paginate } from './paginate';
	import { process } from './process';
	import { getInitialSorting } from './sorting';
	import type { Items, ListSelection } from './utils';
	import { onDestroy } from 'svelte';

	export let properties: string[] = [];
	export let resource: ApiResource<unknown>;

	export let formatters: Formatters = null;
	export let sorting = getInitialSorting(properties, resource);
	export let filters: Filters = {};

	export let currentPage = 0;
	export let pageSize = 12;
	export let itemLink: ItemLink;
	export let newUrl: string;
	export let selectable = true;

	let allItems: Items;
	const unsubscribe = resource.subscribe((value) => {
		allItems = value;
	});
	onDestroy(unsubscribe);

	let items: Items;
	$: items = process({ items: allItems, sorting, filters });
	$: displayedItems = paginate(items, pageSize, currentPage);

	let selection: ListSelection = {};
	let selectCount: number;
	$: selectCount = Object.values(selection).filter((x) => x).length;

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
		selection
	});
</script>

<div class="admin-list">
	<main>
		<table>
			<AdminListHeader {selectable} {properties} {sorting} />
			<tbody>
				{#each Object.entries(displayedItems) as [identifier, item] (identifier)}
					<AdminListEntry
						{item}
						{itemLink}
						{identifier}
						{properties}
						{formatters}
						bind:selection
						{selectable}
					/>
				{/each}
			</tbody>
		</table>
	</main>

	<aside class="sidebar">
		<h3>Actions</h3>
		<a class="btn" href={newUrl}>
			<i class="fas fa-plus-square" />
		</a>

		{#if Object.keys(filters).length > 0}
			<h3>Filters</h3>
			<FilterMenu bind:filters bind:uniqueValues />
		{/if}

		{#if selectCount > 0}
			<p>Selected {selectCount} items</p>
			<button on:click={() => (selection = {})}>Reset Selection</button>
		{/if}

		<p>Showing {Object.keys(displayedItems).length}/{totalItems}</p>
		<Pagination bind:total={totalPages} bind:current={currentPage} />
	</aside>
</div>

<style>
	.admin-list {
		display: grid;
		grid-template-columns: 85% 15%;
		grid-gap: 50px;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
		width: 100%;
	}

	.btn {
		background-color: var(--color-primary);
		color: white;
		padding: 5px 15px;
		width: 100%;
		display: block;
		border-radius: 10px;
		text-align: center;
		font-size: 20px;
	}
</style>
