<script>
  import Search from "./Search.svelte";
  import DraggableCourse from "./DraggableCourse.svelte";

  export let courses = [];
  let search = "";
  let filtered = courses;

  $: {
    filtered = courses.filter(course =>
      course.name.toLowerCase().includes(search.toLowerCase())
    );
  }
</script>

<style>
  ul {
    list-style: none;
  }
  li {
    padding-top: 15px;
  }
</style>

<Search bind:search />
<ul>
  <!-- {#each filtered as course (course.name + course.code)} -->
  {#each filtered as course (course.name)}
    <li>
      <DraggableCourse {course} />
      <!-- <p>{course.name}</p> -->
    </li>
  {/each}
</ul>
