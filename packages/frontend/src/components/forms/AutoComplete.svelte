<script>
    export let data = [];
    export let value = null;
    export let text = '';
    let opened = false;
    let highlightIndex = 0;
    let input, list, filteredData;
    
    // reactive block
    $: {
        const f = text.toLowerCase();
        filteredData = !text ? data : data
            .filter(item => item.toLowerCase().includes(f))

    }
    
    function selectItem () {
        value = filteredData[highlightIndex];
        text = value;
        close();
    }
    
    function up () {
        open();
        if (highlightIndex > 0) highlightIndex--;
        highlight();
    }
    
    function down () {
        open();
        if (highlightIndex < filteredData.length - 1) highlightIndex++;
        highlight();
    }
    
    function onclick (item) {
        value = item;
        text = item.name;
        close();
    }
    
    function onDocumentClick (e) {
        if (!e.target.closest('.autocomplete')) close();
    }
    
    function onkeydown (e) {
        let key = e.key;
        if (key === 'Tab' && e.shiftKey) key = 'ShiftTab';
        const fnmap = {
            Tab: opened ? down.bind(this) : null,
            ShiftTab: opened ? up.bind(this) : null,
            ArrowDown: down.bind(this),
            ArrowUp: up.bind(this),
            Escape: onEsc.bind(this),
        };
        const fn = fnmap[key];
        if (typeof fn === 'function') {
            e.preventDefault();
            fn(e);
        }
    }
    
    function oninput (e) {
        text = e.target.value;
        open();
        highlightIndex = 0;
    }
    
    function onkeypress (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            selectItem();
        }
    }
    
    function onEsc (e) {
        if (text) return clear();
        e.stopPropagation();
        if (opened) {
            input.focus();
            close();
        };
    }
    
    function clear () {
        text = '';
        setTimeout(() => input.focus());
    }
    
    function open () {
        opened = true;
    }
    
    function close () {
        opened = false;
    }
    
    function highlightFilter (q, fields) {
        const qs = '(' + q.trim().replace(/\s/g, ')(.*)(') + ')';
        const reg = new RegExp(qs, 'ig');
        let n = 1, len = qs.split(')(').length + 1, repl = '';
        for (; n < len; n++) repl += n % 2 ? `<b>$${n}</b>` : `$${n}`;
    
        return i => {
            const newI = Object.assign({ highlighted: {} }, i);
            if (fields) {
                fields.forEach(f => {
                    if (!newI[f]) return;
                    newI.highlighted[f] = newI[f].replace(reg, repl);
                });
            }
            return newI;
        };
    }
    </script>

<style>
    .autocomplete {
        min-width: 200px;
        max-width: 60%;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 5px rgba(#000, 0.3);
    }
    .autocomplete * { box-sizing: border-box; }
    .autocomplete-input {
        font: inherit;
        width: 100%;
        border: 1px solid black;
        padding: 5px 11px;
        margin: 10px 0;
        outline: none;
    }
    .autocomplete-list {
        position: relative;
        width: 100%;
        overflow-y: auto;
        z-index: 99;
        padding: 10px 0;
        border-top: 1px solid #ccc;
        max-height: calc(10 * (1em + 10px) + 15px);
        user-select: none;
    }
    .autocomplete-list:empty { padding: 0;  }
    .autocomplete-list-item { padding: 5px 20px; color: #333; cursor: pointer; line-height: 1;  }
    .autocomplete-list-item:hover,
    .autocomplete-list-item.selected { background-color: #2e69e2; color: #fff; }
    .autocomplete-list.hidden { display: none; }
</style>
    
    
<div class="autocomplete">
    <input type="text" class="autocomplete-input"
        bind:this="{input}"
        bind:value="{text}"
        on:input="{oninput}"
        on:focus="{open}"
        on:keydown="{onkeydown}"
        on:keypress="{onkeypress}"
        >
    <div class="autocomplete-list {opened ? '' : 'hidden'}" bind:this="{list}">
        {#each filteredData as item, i}
            <div class="autocomplete-list-item {i === highlightIndex ? 'selected' : ''}"
                on:click="{() => onclick(item)}">

                {@html item.highlighted || item}
            </div>
        {/each}
    </div>
</div>

<svelte:window on:click={onDocumentClick}/>