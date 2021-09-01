<script lang="ts">
	import { AdminList, api, FilterType } from '../../../lib';
	import type { Filters } from '../../../lib';
	import type { Course } from '@planisto/university';

	let loading = null;
	const properties: (keyof Course)[] = ['name', 'teachers', 'extent', 'institute'];
	const newUrl = 'courses/new';

	const filters: Filters = {
		name: { type: FilterType.Search },
		teachers: { type: FilterType.Select }
	};

	const itemLink = (course: Course) => `/catalog/courses/${course.name}`;
</script>

<AdminList {properties} {filters} resource={api.courses} {itemLink} {newUrl} />
