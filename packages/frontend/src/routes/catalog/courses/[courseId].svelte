<script lang="ts" context="module">
	export async function load({ page, fetch }) {
		return { props: { courseId: decodeURIComponent(page.params.courseId) } };
	}
</script>

<script>
	import { api, CourseForm } from '../../../lib';
	export let courseId = null;

	const { courses } = api;
	let course = $courses[courseId];

	console.debug('Course: ', { course });
</script>

<!-- <h1>Kurs "{course.name}"</h1> -->
<a href="/courses">Back</a>
<CourseForm bind:course on:save={() => courses.updateEntity(courseId, course)} />
