<script lang="ts">
    import EditableText from './EditableText.svelte'
    export let list: string[];
    export let editing;
    let adding;
</script>

<ul>
{#if editing}
    {#each list as entry}
    <li>{entry}</li>
    {/each}

    {#if adding}
        <input type="text">
    {:else}
        <button on:click={() => adding = true}>+ Add</button>
    {/if}
{:else}
    {#each list as entry}
    <EditableText bind:value={entry} editing={editing}/>
    {/each}
{/if}
</ul>