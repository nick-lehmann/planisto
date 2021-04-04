<script lang='ts'>
	export let label = ''
	export let value = ''
	export let disabled = false
	export let options = []
	export let names: (any) => string = (option) => option.name as string
	export let nullable = false
	export let multiple = false
</script>

<p>
	<label>{label}</label>
	{#if !multiple}
		<select bind:value disabled={disabled}>
			{#if nullable}
				<option value='{null}'>----</option>
			{/if}
			{#each options as option}
				<option value='{option}'>{names(option)}</option>
			{/each}
		</select>
	{:else}
		<select bind:value multiple disabled={disabled}>
			{#if nullable}
				<option value='{null}'>----</option>
			{/if}
			{#each options as option}
				<option value='{option}'>{names(option)}</option>
			{/each}
		</select>
	{/if}
</p>
