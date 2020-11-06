<script lang="ts">
    import { Module, Extent, Course } from '@planisto/university'
    import Autocomplete from '../../../components/forms/AutoComplete.svelte'

    const modules = [new Module({
        name: 'Künstliche Intelligenz',
        code: 'INF-BAS2',
        extent: new Extent({lecture: 4, exercise: 0, practical: 0}),
        mandatory: false,
        courses: [],
        credits: 18,
        possibleCourses: [new Course({
            name: 'Information Retrieval',
            extent: new Extent({lecture: 2, exercise: 2, practical: 0}),
            teachers: ['Dr. Thiele'],
            exam: 'kp',
            master: true,
            institute: 'SYA'
        }), new Course({
            name: 'Knowledge Graphs',
            extent: new Extent({lecture: 2, exercise: 2, practical: 0}),
            teachers: ['Prof. Krötzsch'],
            exam: 'kp',
            master: true,
            institute: 'THI'
        }), new Course({
            name: 'Maschinelles Übersetzen natürlicher Sprachen ',
            extent: new Extent({lecture: 4, exercise: 1, practical: 0}),
            teachers: ['Prof. Vogler'],
            exam: 'kp',
            master: true,
            institute: 'THI'
        })]
    })]

    const module = modules.find(module => module.code === moduleID)
</script>

<style>
    h2 {
        float: left;
        margin: 0
    }
    button { 
        float: right;
    }
    header {
        padding: 20px 0 20px 0;
    }

    header::after{
        clear:both;
    }

    ul {
        list-style: none;
        padding-left: 0;
        display: block;
    }

    li {
        padding: 10px;
        background-color: #eee;
        margin-bottom: 3px;
        border-radius: 3px;
        transition: all .2s ease-in-out;
    }

    li:hover {
        transform: scale(1.05);
    }

    a {
        color: #333;
    }
    a:hover {
        text-decoration: none;
    }
</style>

{#if module}
    <header>
        <h2>[{module.code}] {module.name}</h2>
        <button>Bearbeiten</button>
    </header>
    <p>Total: {module.extent.toString()}</p>

    <p>Mögliche Kurse: </p>
    <ul>
        {#each module.possibleCourses as course}
        <li class="grow">
            <a href="/">{course.name}</a> {course.extent.toString()}
        </li>
        {/each}
    </ul>
    <Autocomplete data={['foo', 'foobar', 'bar', 'foobaz']}/>
{:else}
    <p class="error">Leider kennen wir kein Modul mit dem Code {moduleID}</p>
{/if}

