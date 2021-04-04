<script lang='ts'>
	import { AdminList, courses } from '../../lib';
	import { Course, Extent } from '@planisto/university';

	const loading = courses.load()

	let searchTerm = '';
	let items;
	$: items = searchTerm ? $courses.filter(course => course.name.includes(searchTerm)) : $courses;

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
		entity={Course}
		properties={['name', 'teachers', 'extent', 'institute']}
		store={courses}
		{itemLink}
	/>
{:catch e}
	<p>Error {e}</p>
{/await}