<script lang="ts" context="module">
	export async function load({ page, fetch }) {
		return { props: { courseId: decodeURIComponent(page.params.moduleId) } };
	}
</script>

<script>
	import { api } from '../../../lib';
	export let moduleId = null;

	const { modules } = api;

	let module = $modules[moduleId];
</script>

<h1>Module "{module.name}"</h1>
<a href="/catalog/modules">Back</a>
<!-- <CourseForm bind:course on:save={update} /> -->
