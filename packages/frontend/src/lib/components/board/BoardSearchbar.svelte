<script lang="ts">
	import type { BoardItemData } from './Board';
	import { dndzone } from 'svelte-dnd-action';
	import BoardCard from './BoardCard.svelte';
	import { api } from '../../stores';

	const { courses } = api;

	let searchTerm: string = null;

	let items: BoardItemData[] = [];
	$: items = Object.values($courses).map((course) => ({
		id: course.name,
		name: course.name
	}));

	// $: console.debug({ items });

	let displayedItems = items;

	function filter(): void {
		console.debug('Filter sidebar elements');
		if (searchTerm !== null && searchTerm != '') displayedItems = items;
		displayedItems = items.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}

	function handleDndConsiderColumns(e) {
		// columns = e.detail.items;
		// console.debug('Consider', columns);
	}
	function handleDndFinalizeColumns(e) {
		// onFinalUpdate(e.detail.items);
	}
	function handleItemFinalize(columnIdx, newItems) {
		// columns[columnIdx].items = newItems;
		// onFinalUpdate([...columns]);
	}
</script>

<div>
	<input type="text" bind:value={searchTerm} on:keyup={filter} />

	<ul
		use:dndzone={{ items }}
		on:consider={handleDndConsiderColumns}
		on:finalize={handleDndFinalizeColumns}
	>
		{#each displayedItems as item (item.id)}
			<BoardCard {item} />
		{/each}
	</ul>
</div>

<style>
	ul {
		padding-left: 0;
	}

	li {
		list-style: none;
	}
</style>
