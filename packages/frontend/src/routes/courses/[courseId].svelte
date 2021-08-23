<script lang="ts" context="module">
	export async function load({ page, fetch }) {
		return { props: { courseId: decodeURIComponent(page.params.courseId) } };
	}
</script>

<script>
	import { courses, CourseForm } from '../../lib';
	export let courseId = null;

	let course = $courses[courseId];

	function update() {
		courses.updateEntity(courseId, course);
	}
</script>

<h1>Kurs "{course.name}"</h1>
<a href="/courses">Back</a>
<CourseForm bind:course on:save={update} />
