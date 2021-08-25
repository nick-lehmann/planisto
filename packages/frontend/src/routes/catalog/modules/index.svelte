<script lang="ts">
	import { AdminList, api } from '../../../lib';
	import type { Module } from '@planisto/university';
	import { onMount } from 'svelte';

	let loading = null;

	const properties: (keyof Module)[] = ['name', 'code', 'extent', 'mandatory'];

	onMount(() => {
		loading = api.modules.load();
	});

	const itemLink = (module: Module) => `/catalog/modules/${module.name}`;
</script>

{#if loading}
	{#await loading}
		<p>Loading...</p>
	{:then body}
		<AdminList {properties} resource={api.modules} {itemLink} />
	{:catch e}
		<p>Error {e}</p>
	{/await}
{/if}
