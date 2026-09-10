<script>
  import { onMount } from 'svelte';
  const base = import.meta.env.BASE_URL;
  let host;
  let paused = false;
  let available = false;
  let sceneApi;
  let failed = false;
  onMount(() => {
    let disposed = false;
    import('./tower.js').then(({ createTower }) => {
      if (disposed) return;
      try {
        sceneApi = createTower(host, (value) => { paused = value; });
        available = true;
      } catch { available = false; failed = true; }
    }).catch(() => { available = false; failed = true; });
    return () => { disposed = true; sceneApi?.dispose(); };
  });
</script>

<div class="tower-view" bind:this={host} aria-label="A three-dimensional brutalist tower with violet neon outlines and drifting fog"></div>
{#if failed}<img class="tower-fallback" src={base + 'images/the-deluge-painting.jpg'} alt="The Deluge by Francis Danby" />{/if}
{#if available}<button class="motion-toggle" onclick={() => sceneApi?.toggle()} aria-label={paused ? 'Start tower rotation' : 'Pause tower rotation'} aria-pressed={paused}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span><span>{paused ? 'Resume rotation' : 'Pause rotation'}</span></button>{/if}
