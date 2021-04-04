<script lang='ts'>
	import { Entity } from 'typeorm';
	import { LinkWrapper } from '../components';

	export let entity: Entity;
	export let properties: string[];
	export let store: Record<string, unknown>[];

	export let currentPage = 0;
	export let pageSize = 10;
	export let itemLink: (key: any) => string;
	export let propertyFormatters: Record<string, (value: any) => string>;

	let searchTerm = '';

	let items = [];
	$: items = $store
		.filter(item => properties.map(prop => item[prop]).some(value => {
			if (typeof value == 'string') return value.includes(searchTerm);
			return false;
		}))
		.slice(currentPage * pageSize, (currentPage + 1) * pageSize - 1);
	$: console.log({ items });

	function propertyDisplayString(item: unknown, propertyName: string): string {
		const value = item[propertyName];
		switch (typeof value) {
			case 'string':
				return value;
			case 'object':
				return propertyFormatters && propertyName in propertyFormatters
					? propertyFormatters[propertyName](value)
					: value.toString();
			default:
				throw Error(`Cannot get display representation for property ${propertyName} for item: ${item}`);
		}
	}
</script>

<input type='text' bind:value={searchTerm} placeholder='Search'>

<table>
	<thead>
	<tr>
		{#each properties as property}
			<td>{property}</td>
		{/each}
	</tr>
	</thead>
	<tbody>
	</tbody>
	{#each items as item}
		<tr>
			{#each properties as propertyName, index}
				<td>
					<LinkWrapper wrap={index === 0} link={encodeURI(itemLink(item))}>
						<p>{propertyDisplayString(item, propertyName)}</p>
					</LinkWrapper>
				</td>
			{/each}
		</tr>
	{/each}
</table>


<style>
    td {
        padding: 10px
    }
</style>