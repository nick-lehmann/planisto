<script lang="ts">
	// import { flip } from 'svelte/animate';
	import type { BoardItemData } from './Board';

	const flipDurationMs = 150;
	export let item: BoardItemData;
</script>

<!-- <div class="card" animate:flip={{ duration: flipDurationMs }}> -->
<div class="card">
	{item.name}
</div>

<style>
	.card {
		height: 4em;
		width: 90%;
		margin: 0.4em auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #dddddd;
		border: 1px solid #333333;
	}
</style>
