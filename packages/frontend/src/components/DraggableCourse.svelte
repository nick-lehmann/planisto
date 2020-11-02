<script>
  import Draggable from "../utils/DnD/Draggable.svelte";
  import Course from "./Card.svelte";

  import { currentlyDraggedCourse } from "../stores"

  export let course;

  const props = {
    course: course
  }

  function dragStart(event) {
    currentlyDraggedCourse.set(course)
  }
</script>

<Draggable component={Course} props={props} on:dragStart={dragStart}/>