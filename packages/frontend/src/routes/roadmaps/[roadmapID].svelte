<script lang="ts" context="module">
	export async function load({ page, fetch }) {
		return { props: { roadmapName: decodeURIComponent(page.params.roadmapID) } };
	}
</script>

<script lang="ts">
	import { api } from '../../lib';
	import type { BoardColumnData } from '../../lib/components/board/Board';
	import Board from '../../lib/components/board/Board.svelte';
	import BoardSearchbar from '../../lib/components/board/BoardSearchbar.svelte';
	import groupBy from 'lodash-es/groupBy';
	import type { RoadmapItem } from '@planisto/university';

	export let roadmapName: string;

	const { roadmaps, periods } = api;

	let columnsData: BoardColumnData[];
	const roadmap = $roadmaps[roadmapName];

	if (roadmap) {
		const roadmapColumns = groupBy(roadmap.items, (item: RoadmapItem) => item.period.id);

		columnsData = Object.entries(roadmapColumns).map((entry) => {
			const [periodID, roadmapItems] = entry;
			const period = $periods[periodID];
			return {
				id: periodID,
				name: period.name,
				items: roadmapItems.map((item) => ({
					id: item.course.name,
					name: item.course.name
				}))
			} as BoardColumnData;
		});

		console.debug({ columnsData });
	}
</script>

{#if roadmap}
	<div class="wrapper">
		<Board
			columns={columnsData}
			onFinalUpdate={(newColumnsData) => (columnsData = newColumnsData)}
		/>

		<aside>
			<BoardSearchbar />
		</aside>
	</div>
{/if}

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
