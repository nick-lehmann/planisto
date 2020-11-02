<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { get } from 'svelte/store';
  import DraggableCourse from "./DraggableCourse.svelte";
  import { DropZone, Draggable, dropZoneIndex, dropZoneID } from "../utils/DnD/";
  import { boardsStore, currentlyDraggedCourse } from "../stores/"
  import type { Module, Course }  from '../models'

  export let module: Module;
  let currentHours = [0,0,0]

  $: module.courses, currentHours = module.currentHours()
 
  let activeDropZone = undefined;
  const dispatch = createEventDispatcher();
  
  let boardStatus = ""
  $: boardStatus = getBoardStatus()

  /**
   *  Move course after is has been dropped on a new board. 
   */
  function onDrop({ detail: { from, to, item: movedCourse } }) {
    if (from === to) return; // Do nothing if dragged into same module
    
    const course: Course = movedCourse.props.course;
		dispatch('receivedCourse', {
      course, 
      module: module,
      index: dropZoneIndex(to)
    });

    module.courses = module.courses
  }

  /**
   * Add active class to board that receives new item
   * if move is valid
   */
  function onDragOver(data) {
    const course: Course = get(currentlyDraggedCourse)
    if (module.acceptsCourse(course))
      activeDropZone = dropZoneIndex(data.detail.dropZoneId);
  }

  /**
   * Remove active class from board where item was dragged out
   */
  function onDragOut(data) {
    activeDropZone = undefined;
  }

  function getBoardStatus() {
    if ($currentlyDraggedCourse == null) return ''
    return module.acceptsCourse($currentlyDraggedCourse) ? 'allowed-board' : 'disallowed-board'
  }
</script>

<style>
  .list-container {
    min-width: 300px;
    padding: 10px;
    margin: 5px;
    margin-right: 20px;
    background-color: #f3f3f3;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  }

  .list-header {
    margin-bottom: 5px;
  }

  .allowed-board {
    border: 3px green solid;
  }
  
  .disallowed-board {
    border: 3px red solid;
  }

  :global(.dropzone) {
    /* border: 1px red solid; */
    display: inline-block;
    width: 100%;
    min-height: 10px;
  }
</style>

<div class="list-container {boardStatus}">
  <h2 class="list-header">
    {module.name.toUpperCase()}
    {#if module.code}({module.code}){/if}
  </h2>

  <p>{ currentHours.join('/') }</p>

  <ul>
    <DropZone
      classes={`dropzone${0 == activeDropZone ? ' active' : ''}`}
      on:drop={onDrop}
      on:dragover={onDragOver}
      on:dragout={onDragOut}
      id={dropZoneID(module.name, 0)} />

    {#if module.courses}
    {#each module.courses as course, index}
      <li>
        <DraggableCourse {course}/>
        <DropZone
          classes={`dropzone${index + 1 == activeDropZone ? ' active' : ''}`}
          on:drop={onDrop}
          on:dragover={onDragOver}
          on:dragout={onDragOut}
          id={dropZoneID(module.name, index + 1)} />
      </li>
    {/each}
    {/if}
  </ul>
</div>
