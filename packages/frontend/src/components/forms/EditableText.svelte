<script lang="ts">
    export let value: string;
    export let editing: boolean;
</script>

{#if !editing}
    <span>{value}</span>
{:else}
    <input type="text" bind:value>
{/if}