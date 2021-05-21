<script lang='ts'>
	import type { SortOrder } from '../sorting';
	import { SortDirection, toggleSorting } from '../sorting';

	export let sortOrder: SortOrder = null;
</script>

<a href="#" on:click={() => {console.log('Toggle sort order'); sortOrder = toggleSorting(sortOrder)}}>
	{#if sortOrder === null}<i class="fas fa-sort"></i>{/if}
	{#if sortOrder === SortDirection.ASC}<i class="fas fa-sort-up"></i>{/if}
	{#if sortOrder === SortDirection.DESC}<i class="fas fa-sort-down"></i>{/if}
</a>
