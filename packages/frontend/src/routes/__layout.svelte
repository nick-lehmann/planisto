<script>
	import '../app.css';
	import 'reflect-metadata';
	import Sidebar from '../lib/components/Sidebar.svelte';
</script>

<div class="app">
	<Sidebar />
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.app {
		display: grid;
		grid-template-columns: 100px 1000px;
		grid-gap: 50px;
		position: relative;
	}
	.content {
		display: block;
		margin: 0 auto;
		width: 100%;
		position: relative;
	}
</style>
