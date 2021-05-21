<script lang='ts'>
	import TextInput from './TextInput.svelte'
	export let value: string[]
	export let placeholder: string
	export let label: string

	if (value === undefined || value === null) value = []
</script>


<label>{label}</label>
<ul>
	{#each Array(value.length) as _, index}
	<li>
		<TextInput bind:value={value[index]} placeholder={placeholder}/>
		<button on:click={() => value = value.filter((_, i) => i !== index)}>x</button>
	</li>
	{/each}
</ul>

<button on:click={() => value = [...value, ""]}>Add</button>