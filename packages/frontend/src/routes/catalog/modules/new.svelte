<script lang='ts'>
	import { CourseForm, courses } from '../../lib';
	import { Course } from '@planisto/university'
	import { goto } from '$app/navigation'

	let course = new Course({})
	async function save() {
		$courses = [...$courses, course]
		console.log($courses)
		await goto('/courses')
		console.log('navigated back')
	}
</script>

<h1>Create a new course</h1>
<a href='/courses'>Back</a>
<CourseForm bind:course on:submit={save}/>