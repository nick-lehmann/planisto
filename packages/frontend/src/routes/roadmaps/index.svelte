<script lang="ts">
	import { api } from '../../lib';

	import type { BoardColumnData } from '../../lib/components/board/Board';
	import Board from '../../lib/components/board/Board.svelte';
	import BoardSearchbar from '../../lib/components/board/BoardSearchbar.svelte';

	// import groupBy from 'lodash-es/groupBy';
	// import type { PeriodID, Roadmap, RoadmapItem } from '@planisto/university';
	import { onMount } from 'svelte';

	let newColumnName = null;
	let highestID = 7;
	let loading = null;

	const { roadmaps, periods } = api;

	// $: console.debug({ roadmaps: $roadmaps, periods: $periods });

	let columnsData: BoardColumnData[] = [];

	// async function load() {
	// 	await Promise.all([roadmaps.load(), periods.load()]);

	// 	const roadmap = Object.values($roadmaps)[0];

	// 	const roadmapColumns = groupBy(roadmap.items, (item: RoadmapItem) => item.period.id);

	// 	columnsData = Object.entries(roadmapColumns).map((entry) => {
	// 		const [periodID, roadmapItems] = entry;
	// 		const period = $periods[periodID];
	// 		return {
	// 			id: periodID,
	// 			name: period.name,
	// 			items: roadmapItems.map((item) => ({
	// 				id: item.course.name,
	// 				name: item.course.name
	// 			}))
	// 		} as BoardColumnData;
	// 	});
	// }

	function addNewColumn(name: string) {
		highestID += 1;
		columnsData = [
			...columnsData,
			{
				name,
				id: highestID.toString(),
				items: []
			}
		];
	}
</script>

{#await loading}
	<p>Loading...</p>
{:then}
	<div class="wrapper">
		<header>
			<form on:submit|preventDefault={() => addNewColumn(newColumnName)}>
				<label for="new-column-name">Add new</label>
				<input
					id="new-column-name"
					type="text"
					bind:value={newColumnName}
					placeholder="New column"
				/>
			</form>
		</header>

		<Board
			columns={columnsData}
			onFinalUpdate={(newColumnsData) => (columnsData = newColumnsData)}
		/>

		<aside>
			<BoardSearchbar />
		</aside>
	</div>
{/await}

<style>
	.wrapper {
		height: 100vh;
		display: grid;
		grid-template-columns: auto 100px;
		grid-template-rows: 50px auto;
	}

	aside {
		width: 100%;
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column: 2;
	}
</style>
