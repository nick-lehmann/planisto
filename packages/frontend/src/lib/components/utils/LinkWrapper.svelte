<script lang="ts">
	export let wrap: boolean;
	export let link: string;
	export let unstyle: boolean = false;
</script>

{#if wrap}
	<a href={link} class:unstyle>
		<slot />
	</a>
{:else}
	<slot />
{/if}

<style>
	.unstyle {
		color: inherit;
		text-decoration: inherit;
	}
</style>
