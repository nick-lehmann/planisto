<script lang='ts'>
	export let type = 'text'
	export let label = ''
	export let value = ''
	export let placeholder = ''
	export let disabled = false
</script>

<p>
	<label>{label}</label>
	{#if type === 'text'}
		<input
			type='text'
			bind:value
			placeholder='{placeholder}'
			disabled={disabled}>
	{/if}
</p>
