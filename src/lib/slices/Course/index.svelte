<script lang="ts">
  import Bounded from '$lib/components/Bounded.svelte';
  import ButtonLink from '$lib/components/ButtonLink.svelte';
  import type { Content } from '@prismicio/client';
  import { PrismicImage, PrismicRichText, PrismicText } from '@prismicio/svelte';
  export let slice: Content.CourseSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
  <h2 class="max-w-2xl mx-auto text-balance text-center text-5xl font-medium md:text-7xl mb-16">
    <PrismicRichText field={slice.primary.heading} />
  </h2>

  <div class="course-grid">
    {#each slice.primary.course as item}
      <div class="course-card group">
        <div class="card-image-wrap">
          <div class="glow glow-orange"></div>
          <div class="glow glow-violet"></div>
          <a data-fancybox="gallery" href={item.image.url} data-caption={item.image.alt || 'Image'}>
            <PrismicImage
              field={item.image}
              class="card-image rounded-xl scale-[.98] transition-transform duration-300 group-hover:scale-100"
            />
          </a>
        </div>

        <h3 class="card-title">
          <PrismicText field={item.subheading} />
        </h3>

        <div class="card-date">
          <PrismicRichText field={item.coursedate} />
        </div>

        <div class="card-desc">
          <PrismicRichText field={item.description} />
        </div>

        <div class="card-action">
          <ButtonLink field={item.link}>Course Link</ButtonLink>
        </div>
      </div>
    {/each}
  </div>
</Bounded>

<style>
  /* ── Outer grid ── */
  .course-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 5 row tracks: image | title | date | desc | button */
    grid-template-rows: auto;
    gap: 2rem 1.5rem;
    align-items: start;
  }

  /* Center when fewer than 3 cards */
  .course-grid:has(.course-card:nth-child(1):nth-last-child(1)) {
    grid-template-columns: minmax(0, 380px);
    justify-content: center;
  }
  .course-grid:has(.course-card:nth-child(1):nth-last-child(2)) {
    grid-template-columns: repeat(2, minmax(0, 380px));
    justify-content: center;
  }

  @media (max-width: 1024px) {
    .course-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .course-grid { grid-template-columns: 1fr; }
  }

  /* ── Card: subgrid across 5 row tracks ── */
  .course-card {
    display: grid;
    /* Each card spans 5 rows and uses subgrid so all cards share the same row heights */
    grid-row: span 5;
    grid-template-rows: subgrid;
    align-items: start;

    text-align: center;
    opacity: 0.88;
    transition: opacity 0.3s ease;
    cursor: pointer;
  }
  .course-card:hover { opacity: 1; }

  /* ── Image ── */
  .card-image-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .card-image-wrap :global(.card-image) {
    width: 100%;
    max-width: 280px;
    height: auto;
    border-radius: 0.75rem;
    display: block;
  }

  .glow {
    @apply absolute h-1/2 w-1/2 rounded-full opacity-30 mix-blend-screen blur-3xl transition-opacity duration-500 group-hover:opacity-50;
  }
  .glow-orange { @apply bg-orange-500 -bottom-4 -left-2; }
  .glow-violet { @apply bg-violet-500 -top-4 -left-2; }

  /* ── Text rows ── */
  .card-title {
    @apply text-2xl font-semibold pt-4;
    align-self: start;
  }
  .card-date {
    @apply text-sm opacity-60;
    align-self: start;
  }
  .card-desc {
    @apply text-sm leading-relaxed opacity-80;
    align-self: start;
  }

  /* ── Button always at the bottom of its track ── */
  .card-action {
    display: flex;
    justify-content: center;
    align-self: end;
    padding-top: 0.5rem;
  }
</style>
