<script lang="ts">
	export let total: number;
	export let current: number;
</script>

<ul>
	{#each Array(total) as _, pageIndex}
		<li class:active={pageIndex === current}>
			<a href="#" on:click={() => (current = pageIndex)}>{pageIndex + 1}</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding-left: 0;
	}

	li {
		display: inline-block;
		padding: 10px;
		background: lightgrey;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	li.active {
		background-color: var(--color-primary);
	}
</style>
