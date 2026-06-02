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
        <!-- Image -->
        <div class="card-image-wrap">
          <div class="glow glow-orange"></div>
          <div class="glow glow-violet"></div>
          <a data-fancybox="gallery" href={item.image.url} data-caption={item.image.alt || 'Image'}>
            <PrismicImage
              field={item.image}
              class="card-image z-20 rounded-xl scale-[.98] transition-transform duration-300 group-hover:scale-100"
            />
          </a>
        </div>

        <!-- Content -->
        <div class="card-body">
          <h3 class="card-title">
            <PrismicText field={item.subheading} />
          </h3>
          <div class="card-date">
            <PrismicRichText field={item.coursedate} />
          </div>
          <div class="card-desc">
            <PrismicRichText field={item.description} />
          </div>
          <ButtonLink field={item.link} class="mt-auto">
            Course Link
          </ButtonLink>
        </div>
      </div>
    {/each}
  </div>
</Bounded>

<style>
  /* Grid: 3 columns, single item centers */
  .course-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    justify-items: center;
  }

  /* When fewer than 3 items, center them */
  .course-grid:has(.course-card:only-child),
  .course-grid:has(.course-card:nth-child(1):nth-last-child(1)) {
    grid-template-columns: minmax(0, 380px);
    justify-content: center;
  }

  .course-grid:has(.course-card:nth-child(1):nth-last-child(2)) {
    grid-template-columns: repeat(2, minmax(0, 380px));
    justify-content: center;
  }

  @media (max-width: 1024px) {
    .course-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .course-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Card */
  .course-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 380px;
    opacity: 0.88;
    transition: opacity 0.3s ease;
    cursor: pointer;
  }

  .course-card:hover {
    opacity: 1;
  }

  /* Image wrapper with glow effects */
  .card-image-wrap {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 1.25rem;
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

  .glow-orange {
    @apply bg-orange-500 -bottom-4 -left-2;
  }

  .glow-violet {
    @apply bg-violet-500 -top-4 -left-2;
  }

  /* Card body */
  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    flex: 1;
  }

  .card-title {
    @apply text-2xl font-semibold mb-2;
  }

  .card-date {
    @apply text-sm opacity-60 mb-3;
  }

  .card-desc {
    @apply text-sm leading-relaxed opacity-80 max-w-xs;
  }
</style>
