<script>
  import Tower from './Tower.svelte';
  const base = import.meta.env.BASE_URL;
  const bandcamp = 'https://brutalistpalace.bandcamp.com/album/the-deluge';
  const instagram = 'https://www.instagram.com/brutalist_palace/';
  const tracks = [
    { title: 'Overture', time: '05:52', slug: 'overture' },
    { title: 'Cheese?', time: '03:08', slug: 'cheese' },
    { title: 'E.B.N 2', time: '03:55', slug: 'e-b-n-2' },
    { title: 'Foggy Soggy Path', time: '03:58', slug: 'foggy-soggy-path' },
  ];
</script>

<svelte:head><meta name="color-scheme" content="dark" /></svelte:head>

<a class="skip-link" href="#musica">Skip to music</a>
<header class="site-header" id="inizio">
  <a href="#inizio" class="wordmark" aria-label="Brutalist Palace, home">BRUTALIST<span>_</span>PALACE</a>
  <nav aria-label="Main navigation"><a href="#musica">Music</a><a href="#progetto">The project</a><a class="nav-external" href={bandcamp} target="_blank" rel="noreferrer">Bandcamp <span aria-hidden="true">↗</span></a></nav>
</header>

<main>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-art"><Tower /></div>
    <div class="hero-content">
      <h1 id="hero-title">BRUTALIST<span class="underscore">_</span><br />PALACE<span class="title-period" aria-hidden="true">.</span></h1>
      <a class="button primary" href={bandcamp} target="_blank" rel="noreferrer"><svg width="15" height="16" viewBox="0 0 15 16" fill="none" aria-hidden="true"><path d="m3 2 10 6-10 6V2Z" fill="currentColor"/></svg>The Deluge out now <span aria-hidden="true">↗</span></a>
      <div class="genre-labels"><span>Progressive metal</span><span>Synthwave</span></div>
    </div>
    <div class="hero-bottom"><a href="#musica" class="scroll-cue"><span aria-hidden="true">↓</span> Music</a></div>
  </section>
  <div class="sound-strip" aria-label="The sound of the project"><span>8-string guitars</span><span aria-hidden="true">×</span><span>Synthesizers</span><span aria-hidden="true">×</span><span>Odd time signatures</span><span aria-hidden="true">×</span><span>Classical guitar</span></div>
  <section id="musica" class="release section-shell">
    <div class="section-heading"><p class="eyebrow">01 / Music</p></div>
    <div class="release-grid">
      <figure class="release-art"><a class="cover-link" href={bandcamp} target="_blank" rel="noreferrer" aria-label="Listen to The Deluge on Bandcamp"><img src={base + 'images/the-deluge-cover.jpg'} alt="The Deluge cover: a flood scene painted by Francis Danby" width="1200" height="1200" loading="lazy" /><span class="cover-corner top-left"></span><span class="cover-corner bottom-right"></span></a><figcaption>Artwork: Francis Danby, <a href="https://commons.wikimedia.org/wiki/File:Francis_Danby_-_The_Deluge_-_Google_Art_Project.jpg" target="_blank" rel="noreferrer">The Deluge, c. 1840 ↗</a></figcaption></figure>
      <div class="release-info"><p class="eyebrow violet">EP / 08 SEP 2026 <span class="release-count">04 tracks</span></p><h2>The Deluge</h2>
        <ol class="track-list" aria-label="The Deluge EP track list">{#each tracks as track, index}<li><a href={'https://brutalistpalace.bandcamp.com/track/' + track.slug} target="_blank" rel="noreferrer" aria-label={'Listen to ' + track.title + ' on Bandcamp'}><span class="track-number">0{index+1}</span><span class="track-title">{track.title}</span><span class="track-time">{track.time}</span><span class="track-arrow" aria-hidden="true">↗</span></a></li>{/each}</ol>
        <a class="text-link" href={bandcamp} target="_blank" rel="noreferrer">Listen to the EP on Bandcamp <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>
  <section id="progetto" class="about" aria-labelledby="about-title"><div class="section-shell">
    <div class="section-heading"><p class="eyebrow">02 / The project</p></div>
    <div class="about-grid">
      <div class="about-copy"><h2 id="about-title">About</h2><div class="bio-text"><p>I studied electric guitar at AMM and worked in a recording studio before moving into programming.</p><p>I started writing again during Covid. BRUTALIST_PALACE is my solo project. I'd like to play it live someday.</p></div><a class="text-link" href={instagram} target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a></div>
      <figure class="portrait"><div class="portrait-image"><img src={base + 'images/portrait.jpg'} alt="Playing guitar outdoors" width="960" height="1280" loading="lazy" /><div class="portrait-mark" aria-hidden="true">BP<span>_</span></div></div><figcaption>Guitar, synths, production</figcaption></figure>
    </div>

  </div></section>
</main>
<footer class="site-footer"><div class="footer-brand"><a class="wordmark" href="#inizio">BRUTALIST<span>_</span>PALACE</a></div><div class="footer-links"><a href={bandcamp} target="_blank" rel="noreferrer">Bandcamp <span aria-hidden="true">↗</span></a><a href={instagram} target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a></div><span>© {new Date().getFullYear()} BRUTALIST_PALACE</span></footer>
