<script lang='ts' context="module">
	export async function load({ page, fetch }) {
		return { props: { courseId: decodeURIComponent(page.params.courseId) }}
	}
</script>

<script>
	import { courses, CourseForm  } from '../../lib';
	export let courseId = null

	let course = $courses.find(course => course.name === courseId)
</script>

<h1>Kurs "{course.name}"</h1>
<a href='/courses'>Back</a>
<CourseForm bind:course/>