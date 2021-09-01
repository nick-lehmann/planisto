<script lang="ts">
	import { loading } from '../stores';
</script>

<nav>
	<div class="avatar">
		<img src="https://www.signivis.com/img/custom/avatars/member-avatar-01.png" alt="Avatar" />
	</div>

	<ul>
		<li>
			<a href="/roadmaps">Roadmaps</a>
		</li>
		<li>
			<a href="/catalog/courses">Catalog</a>
		</li>
		<li>
			<a href="/settings">Settings</a>
		</li>

		{#if $loading}
			<p>Loading</p>
		{/if}
	</ul>
</nav>

<style>
	nav {
		height: 100vh;
		max-width: 200px;
		background-color: var(--color-secondary);
		overflow-x: hidden;
		position: relative;
	}

	ul {
		padding-left: 0px;
	}

	li {
		list-style: none;
		padding: 5px;
		border-top: 1px solid var(--color-primary);
		color: white;
	}

	li:last-child {
		border-bottom: 1px solid var(--color-primary);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.avatar {
		width: 80%;
		border-radius: 50%;
		overflow: hidden;
		margin: 20px auto;
	}

	img {
		width: 100%;
		height: 100%;
		background: var(--color-lightgrey);
	}
</style>
