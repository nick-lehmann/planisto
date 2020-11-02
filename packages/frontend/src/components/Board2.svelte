<script lang="ts">
    import Board from "./List.svelte";
    import { Context } from "../utils/DnD/";
    import { University, Module, Course  } from "../models";
    import { boardsStore } from "../stores/"
  
    export let courses;
  
    let university = new University(courses)
    // @ts-ignore
    window.university = university
  
    const initialBoards = Object.fromEntries(university.modules.map(module => [module.name, module]))
    boardsStore.set(initialBoards)
    console.log($boardsStore)
  
    function courseMoved (event) {
      const receivingModule: Module = event.detail.module
      const movedCourse = event.detail.course
      university.moveCourse(movedCourse, receivingModule)
    }
  </script>
  
  <style>
    .board-list {
      justify-content: start;
      display: flex;
      align-items: flex-start;
      overflow: auto;
      height: 100%;
    }
    :global(.active) {
      background: #777;
    }
  </style>
  
  <div class="board-list">
  <Context>
    {#each Object.keys($boardsStore) as key}
      <Board bind:module={$boardsStore[key]} on:receivedCourse={courseMoved}/>
    {/each}
  </Context>
  </div>