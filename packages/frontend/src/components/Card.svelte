<script lang="ts">
  import type { Course } from "../models"

  export let course: Course
</script>

<style>
  .course { 
    padding: 10px;
    user-select: none;
    border-radius: 5px;
  }

  h3 {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 900;
    word-break: break-word;
  }

  .module {
    display: inline-block;
    background-color: #ccc;
    padding: 3px;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 10px;
  }
</style>

<div class="card course">
  <h3>{course.name}</h3>
  <span>{course.hours.join('/')} - {course.teachers.join(', ')}</span>

  <ul>
    {#each course.possibleModules as module}
      <li class="module">{module.name}</li>
    {/each}
  </ul>
</div>
