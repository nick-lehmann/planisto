<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import BoardColumn from './BoardColumn.svelte';
	const flipDurationMs = 300;

	export let columns;
	// will be called any time a card or a column gets dropped to update the parent data
	export let onFinalUpdate;

	function handleDndConsiderColumns(e) {
		columns = e.detail.items;
		console.debug('Consider', columns);
	}
	function handleDndFinalizeColumns(e) {
		onFinalUpdate(e.detail.items);
	}
	function handleItemFinalize(columnIdx, newItems) {
		columns[columnIdx].items = newItems;
		onFinalUpdate([...columns]);
	}
</script>

<section
	class="board"
	use:dndzone={{ items: columns, flipDurationMs, type: 'column' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
>
	{#each columns as { id, name, items }, idx (id)}
		<div class="column" animate:flip={{ duration: flipDurationMs }}>
			<BoardColumn {name} {items} onDrop={(newItems) => handleItemFinalize(idx, newItems)} />
		</div>
	{/each}
</section>

<style>
	section {
		padding: 0;
		margin: 0;
	}
	.board {
		height: 100%;
		/* TODO */
		width: 100%;
		overflow-y: auto;
		overflow-x: auto;
	}
	.column {
		height: 100%;
		width: 250px;
		margin-right: 30px;
		display: inline-block;
		border: 1px solid #333333;
		box-sizing: border-box;
	}
</style>
