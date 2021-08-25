<script>
	import '../app.css';
	import 'reflect-metadata';
</script>

<div class="app">
	<nav>
		<div class="avatar">
			<img src="https://www.signivis.com/img/custom/avatars/member-avatar-01.png" alt="Avatar" />
		</div>

		<ul>
			<li>
				<a href="/plans">Plans</a>
			</li>
			<li>
				<a href="/courses">Courses</a>
			</li>
			<li>
				<a href="/universities">Universities</a>
			</li>
			<li>
				<a href="/degrees">Degrees</a>
			</li>
		</ul>
	</nav>

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
