<script lang="ts">
	import { page } from '$app/stores';

	let subpages = [
		{
			title: 'Courses',
			url: '/catalog/courses'
		},
		{
			title: 'Degrees',
			url: '/catalog/degrees'
		},
		{
			title: 'Faculties',
			url: '/catalog/faculties'
		},
		{
			title: 'Modules',
			url: '/catalog/modules'
		},
		{
			title: 'Universities',
			url: '/catalog/university'
		}
	];
</script>

<h1>
	<a href="/catalog/courses">Catalog</a>
</h1>

<div class="subpages">
	{#each subpages as subpage}
		<a href={subpage.url} alt={subpage.title} class:active={$page.path == subpage.url}>
			{subpage.title}
		</a>
	{/each}
</div>

<slot />

<style>
	h1 {
		display: inline-block;
	}

	h1 a {
		text-decoration: none;
		color: inherit;
	}

	.subpages {
		display: inline-block;
		margin-left: 50px;
	}
	.subpages a {
		display: inline-block;
		padding: 5px;
		background: var(--color-lightgrey);
		text-decoration: none;
		color: var(--color-darkgrey);
		margin-right: 10px;
	}
	a.active {
		background-color: var(--color-primary);
	}
</style>
