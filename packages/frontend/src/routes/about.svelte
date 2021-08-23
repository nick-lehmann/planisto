<script context="module" lang="ts">
	console.log("hello from context")
</script>

<script lang="ts">
	import { Course } from '@planisto/university'
	console.log("hello from page")

	const loading = new Promise((resolve, reject) => {
		console.log("hello from promise")
	})
</script>

<h1>Test</h1>