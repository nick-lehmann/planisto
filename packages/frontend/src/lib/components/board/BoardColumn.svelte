<script>
	import { dndzone } from 'svelte-dnd-action';
	import BoardCard from './BoardCard.svelte';

	const flipDurationMs = 150;
	export let name;
	export let items;
	export let onDrop;

	function handleDndConsiderCards(e) {
		items = e.detail.items;
	}
	function handleDndFinalizeCards(e) {
		onDrop(e.detail.items);
	}
</script>

<div class="wrapper">
	<div class="column-title">
		{name}
	</div>
	<div
		class="column-content"
		use:dndzone={{ items, flipDurationMs, dropTargetStyle: {} }}
		on:consider={handleDndConsiderCards}
		on:finalize={handleDndFinalizeCards}
	>
		{#each items as item (item.id)}
			<BoardCard {item} />
		{/each}
	</div>
</div>

<style>
	.wrapper {
		height: 99%;
		/*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
		overflow-y: hidden;
		box-sizing: border-box;
	}
	.column-content {
		height: calc(100% - 5em);
		/* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.column-title {
		height: 2.5em;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
