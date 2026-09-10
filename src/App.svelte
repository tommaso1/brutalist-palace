<script>
  import Tower from './Tower.svelte';
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
  <nav aria-label="Main navigation"><a href="#musica">Music</a><a href="#progetto">The project</a><a class="nav-external" href={instagram} target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a></nav>
</header>

<main>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-art"><Tower /></div>
    <div class="hero-content">
      <p class="eyebrow"><span class="small-line"></span> Independent music project</p>
      <h1 id="hero-title">BRUTALIST<span class="underscore">_</span><br />PALACE<span class="title-period" aria-hidden="true">.</span></h1>
      <p class="hero-description">Heavy sounds. Irregular structures.<br />A place for the music inside my head.</p>
      <a class="button primary" href={bandcamp} target="_blank" rel="noreferrer"><svg width="15" height="16" viewBox="0 0 15 16" fill="none" aria-hidden="true"><path d="m3 2 10 6-10 6V2Z" fill="currentColor"/></svg>Listen to The Deluge <span aria-hidden="true">↗</span></a>
      <div class="genre-labels"><span>Progressive metal</span><span>Synthwave</span><span>Beyond genres</span></div>
    </div>
    <div class="hero-bottom"><a href="#musica" class="scroll-cue"><span aria-hidden="true">↓</span> Explore the sound</a><span class="hero-caption">CONCRETE / FREQUENCIES / DISTORTION</span><span class="hero-index">BP—001</span></div>
  </section>
  <div class="sound-strip" aria-label="The sound of the project"><span>8-string guitars</span><span aria-hidden="true">×</span><span>Synthesizers</span><span aria-hidden="true">×</span><span>Odd time signatures</span><span aria-hidden="true">×</span><span>Classical guitar</span></div>
  <section id="musica" class="release section-shell">
    <div class="section-heading"><p class="eyebrow">01 / Music</p><span class="section-meta">The debut release</span></div>
    <div class="release-grid">
      <figure class="release-art"><a class="cover-link" href={bandcamp} target="_blank" rel="noreferrer" aria-label="Listen to The Deluge on Bandcamp"><img src="/images/the-deluge-cover.jpg" alt="The Deluge cover: a flood scene painted by Francis Danby" width="1200" height="1200" loading="lazy" /><span class="cover-corner top-left"></span><span class="cover-corner bottom-right"></span></a><figcaption>Artwork: Francis Danby, <a href="https://commons.wikimedia.org/wiki/File:Francis_Danby_-_The_Deluge_-_Google_Art_Project.jpg" target="_blank" rel="noreferrer">The Deluge, c. 1840 ↗</a></figcaption></figure>
      <div class="release-info"><p class="eyebrow violet">EP / 08 SEP 2026 <span class="release-count">04 tracks</span></p><h2>The Deluge</h2><p class="release-description">Four tracks. Guitars, synthesizers, and no predetermined shape. Written, played, and produced by me, down to the last synth patch.</p>
        <ol class="track-list" aria-label="The Deluge EP track list">{#each tracks as track, index}<li><a href={'https://brutalistpalace.bandcamp.com/track/' + track.slug} target="_blank" rel="noreferrer" aria-label={'Listen to ' + track.title + ' on Bandcamp'}><span class="track-number">0{index+1}</span><span class="track-title">{track.title}</span><span class="track-time">{track.time}</span><span class="track-arrow" aria-hidden="true">↗</span></a></li>{/each}</ol>
        <a class="text-link" href={bandcamp} target="_blank" rel="noreferrer">Listen to the EP on Bandcamp <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>
  <section id="progetto" class="about" aria-labelledby="about-title"><div class="section-shell">
    <div class="section-heading"><p class="eyebrow">02 / The project</p><span class="section-meta">One person. Every sound.</span></div>
    <div class="about-grid">
      <div class="about-copy"><h2 id="about-title">Music always<br />finds a <span>way out.</span></h2><div class="bio-text"><p>I studied music, earned a diploma in electric guitar at AMM, and worked in a recording studio. Then life took me into programming. But the music never really went away.</p><p>I started writing again during Covid, and kept coming back to it in the years that followed. Eight-string riffs, synthesizers, odd time signatures, and passages of classical guitar. Pieces of different worlds that make sense together, at least to me.</p><p>That’s where BRUTALIST_PALACE comes from. There’s no grand plan. Just a need to put the music I love out into the world. And maybe, someday, find a way to play it live.</p></div><a class="text-link" href={instagram} target="_blank" rel="noreferrer">Follow the project on Instagram <span aria-hidden="true">↗</span></a></div>
      <figure class="portrait"><div class="portrait-image"><img src="/images/portrait.jpg" alt="The musician behind BRUTALIST_PALACE playing guitar outdoors in the hills" width="960" height="1280" loading="lazy" /><div class="portrait-mark" aria-hidden="true">BP<span>_</span></div></div><figcaption><span>Behind the palace</span><span>Guitar / Synth / Production</span></figcaption></figure>
    </div>
    <div class="manifesto"><span class="eyebrow">No other agenda.</span><p>Making the music I want to hear<span>.</span></p><span class="manifesto-cross" aria-hidden="true">+</span></div>
  </div></section>
</main>
<footer class="site-footer"><div class="footer-brand"><a class="wordmark" href="#inizio">BRUTALIST<span>_</span>PALACE</a><p>Music, for the sake of making it.</p></div><div class="footer-links"><a href={bandcamp} target="_blank" rel="noreferrer">Bandcamp <span aria-hidden="true">↗</span></a><a href={instagram} target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a></div><span>© {new Date().getFullYear()} BRUTALIST_PALACE</span></footer>
