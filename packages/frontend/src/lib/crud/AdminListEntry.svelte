<script lang="ts">
	import { LinkWrapper } from '../components';
	import { display } from './display';
	import type { ItemLink, Formatters } from './display';
	import type { ListSelection } from './utils';

	export let identifier: string;
	export let properties: string[];
	export let item: any;
	export let itemLink: ItemLink;
	export let formatters: Formatters;

	export let selection: ListSelection = {};
	export let selectable: boolean = true;
</script>

<tr class:selected={selection[identifier]}>
	{#if selectable}
		<td>
			<input type="checkbox" bind:checked={selection[identifier]} />
		</td>
	{/if}
	{#each properties as property, index}
		<td>
			<LinkWrapper wrap={index === 0} link={encodeURI(itemLink(item))} unstyle>
				<p>{display(item, property, formatters)}</p>
			</LinkWrapper>
		</td>
	{/each}
</tr>

<style>
	td {
		margin: 0px;
		padding: 0 15px;
	}

	tr:nth-child(odd) {
		background-color: #eee;
	}

	.selected {
		border: 2px solid lightblue;
		background-color: lightblue !important;
	}
</style>
