<script>
  export let component;
  export let props = {};

	import { createEventDispatcher } from 'svelte';
  import { get } from 'svelte/store';
  import { onmousedown, onmouseup } from './lib';

	const dispatch = createEventDispatcher();

  const onMouseDown = (event) => {
    if (event.which !== 1) {
      return;
    }
    dispatch('dragStart', {event, props})
    onmousedown(event, component, props);
  }

  const onMouseUp = (event) => {
    event.stopPropagation();
    onmouseup(event, component, props);
  }
</script>

<div on:mousedown={onMouseDown} on:mouseup={onMouseUp}>
  <svelte:component this={component} {...props} />
</div>
