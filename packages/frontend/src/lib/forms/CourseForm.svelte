<script lang='ts'>
	import { Course, Faculty } from '@planisto/university';
	import { faculties, languages } from '../stores';
	import { TextInput, Select, List } from '../components';
	import { createEventDispatcher } from 'svelte'

	export let course = new Course({});

	let currentFaculty: Faculty | null = null;
	$: console.log(course);

	const dispatch = createEventDispatcher()
	function save() {
		dispatch('save', {course})
	}
</script>

<form on:submit|preventDefault={save}>
	<TextInput label='Name' bind:value={course.name} placeholder='Bla bla'/>
	<List label='Teachers' bind:value={course.teachers} placeholder='Dr. Foo'/>
	<TextInput label='Umfang' bind:value={course.extent} placeholder='2/2/0'/>
	<TextInput label='Exam Type' bind:value={course.exam} placeholder='M(90)'/>

	<Select
		label='Fakultät'
		bind:value={currentFaculty}
		options={$faculties}
		names={(faculty) => faculty.name}
		nullable
	/>

	<Select
		label='Institut'
		bind:value={course.institute}
		options={currentFaculty !== null ? currentFaculty.institutes : []}
		nullable
	/>

	<Select
		label='Sprachen'
		bind:value={course.institute}
		options={$languages}
		names='{(language) => language.name}'
	/>

	<button type='submit'>Speichern</button>
</form>
