<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import Bounded from '$lib/components/Bounded.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import { PrismicRichText, PrismicImage, PrismicLink, PrismicText } from '@prismicio/svelte';

	export let slice: Content.ShowcasesSlice;

	console.log('Slice data:', slice);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce').matches;

		if (prefersReducedMotion) return;

		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo(
			'.showcase__heading',
			{
				y: 100
			},
			{
				y: 0,
				ease: 'power2.inOut',
				duration: 1,
				scrollTrigger: {
					trigger: '.showcase__heading',
					start: 'top bottom-=40%',
					toggleActions: 'play pause resume reverse'
				}
			}
		);

		gsap.fromTo(
			'.showcase__glow',
			{
				scale: 0.7,
				opacity: 0.1
			},
			{
				scale: 1,
				opacity: 0.35,
				ease: 'power2.inOut',
				duration: 1,
				scrollTrigger: {
					trigger: '.showcase__heading',
					start: 'top bottom-=40%',
					toggleActions: 'play pause resume reverse'
				}
			}
		);
	});
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="relative">
	<div
		class="showcase__glow absolute -z-10 aspect-video w-full max-w-2xl rounded-full bg-violet-500/40 mix-blend-screen blur-[120px] filter"
	></div>

	{#if slice.primary.heading}
		<h2 class="showcase__heading text-balance text-center text-5xl font-medium md:text-7xl">
			<PrismicText field={slice.primary.heading} />
		</h2>
	{/if}

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-2">
		{#each slice.primary.items as item}
			<div
				class="relative mt-8 flex flex-col gap-6 rounded-xl border border-violet-50/20 bg-gradient-to-b from-gray-50/15 to-gray-50/15 px-6 py-6 backdrop-blur-sm"
			>
				<div class="grid-background"></div>

				<h3 class="text-2xl font-normal">
					<PrismicText field={item.subheading} />
				</h3>

				<div class="prose prose-invert">
					<PrismicRichText field={item.body} />
				</div>

				{#if item.button_link}
					<ButtonLink field={item.button_link} class="mt-4">
						{item.button_lable || 'Learn more'}
					</ButtonLink>
				{/if}

				<PrismicImage
					field={item.image}
					class="opacity-90 shadow-2xl"
					sizes="(max-width: 768px) 100vw, 50vw"
				/>
			</div>
		{/each}
	</div>
</Bounded>

<style>
	.grid-background {
		background-image: url('/assets/grid-pattern.png');
		position: absolute;
		inset: 0;
		background-repeat: repeat;
		z-index: -1;
		background-position: center;
		opacity: 0.15;
		mask-image: radial-gradient(circle at 60% 50%, black 10%, transparent 40%);
	}
</style>
