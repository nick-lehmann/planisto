<script lang='ts'>
	import { AdminList, api } from '../../lib';
	import { Course } from '@planisto/university';

	const { courses } = api

	const loading = api.courses.load()

	// let propertyFormatters = {
	// 	'extent': (value: Extent) => `${value.lecture}/${value.exercise}/${value.practical}`
	// }

	const itemLink = (course: Course) => `/courses/${course.name}`;
</script>

<h1>Courses</h1>

{#await loading}
	<p>Loading...</p>
{:then body}
	<AdminList
		properties={['name', 'teachers', 'extent', 'institute']}
		resource={api.courses}
		{itemLink}
	/>
{:catch e}
	<p>Error {e}</p>
{/await}