<script lang='ts'>
	export let wrap: boolean
	export let link: string
</script>

{#if wrap}
	<a href='{link}'>
		<slot/>
	</a>
{:else}
	<slot/>
{/if}