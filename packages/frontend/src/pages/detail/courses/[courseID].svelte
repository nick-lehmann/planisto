<script lang="ts">
    import { Course, Extent } from '@planisto/university'
    import EditableText from '../../../components/forms/EditableText.svelte'
    import EditableTextList from '../../../components/forms/EditableTextList.svelte'

    export let courseID;
    let editing = false;

    console.log('Request course with id', courseID)
    let course = new Course({
        name: 'Methoden der Mathematik',
        extent: new Extent({ lecture: 4, exercise: 2, practical: 0}),
        teachers: [
            "Prof. Dr. Baumann",
            "Angelika Neumann"
        ],
        institute: 'Institut für Analyse',
        exam: "SP(90min)",
        master: false,
        languages: ["de"]
    })
</script>

<style>
    header {
        padding: 20px 0 20px 0;
    }

    h2 {
        float: left;
        margin: 0
    }
    button { 
        float: right;
    }

    header::after{
        clear:both;
    }

    ul {
        padding-left: 14px;
    }

    dt, dd {
        float: left
    }

    dt {
        width: 150px;
        clear: both
    }

    dd {
        margin-bottom: 10px
    }
</style>

<header>
    <h2>{ course.name }</h2>
    <button on:click={() => editing = !editing}>{#if editing}Fertig!{:else}Bearbeiten{/if}</button>
</header>

<dl>
    <dt>Umfang</dt>
    <dd>{ course.extent.toString() }</dd>

    <dt>Lehrer</dt>
    <dd>
        <EditableTextList bind:list={course.teachers} editing={editing} />
    </dd>

    <dt>Institut</dt>
    <dd><EditableText bind:value={course.institute} editing={editing} /></dd>

    <dt>Exam</dt>
    <dd><EditableText bind:value={course.exam} editing={editing}/></dd>

    <dt>Sprache</dt>
    <dd>
        {#if course.language.length > 1}
        <ul>
            {#each course.language as language}
            <li>{language}</li>
            {/each}
        </ul>
        {:else}
        {course.language[0]}
        {/if}
    </dd>

</dl>