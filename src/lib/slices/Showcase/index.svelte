<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import Bounded from '$lib/components/Bounded.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, PrismicImage, PrismicLink, PrismicText } from '@prismicio/svelte';
	import clsx from 'clsx';

	import PhPresentationChartLight from '~icons/ph/presentation-chart-light';
	import PhArrowsClockwise from '~icons/ph/arrows-clockwise';

	export let slice: Content.ShowcaseSlice;

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

	const icons = {
		Screen: PhArrowsClockwise,
		Monitor: PhPresentationChartLight
	};
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

	<div>
		{#each slice.primary.items as item}
			<div
				class="relative mt-16 grid items-center gap-8 rounded-xl border border-violet-50/20 bg-gradient-to-b from-gray-50/15 to-gray-50/15 px-8 py-8 backdrop-blur-sm lg:grid-cols-3"
			>
				<div class="grid-background"></div>

				<div>
					{#if item.icon}
						<div class="w-fit rounded-lg bg-violet-800 p-4 text-3xl">
							<svelte:component this={icons[item.icon]} />
							<!-- {slice.primary.icon} -->
						</div>
					{/if}

					<h3 class="mt-6 text-2xl font-normal">
						<PrismicText field={item.subheading} />
					</h3>

					<div class="prose prose-invert mt-4">
						<PrismicRichText field={item.body} />
					</div>

					{#if item.button_link}
						<ButtonLink field={item.button_link} class="mt-6">
							{item.button_lable || 'Lean more'}
						</ButtonLink>
					{/if}

					<!-- {#if slice.primary.to_case_study}
					<ButtonLink field={slice.primary.to_case_study} class="mt-6">
						{slice.primary.button_lable || 'Lean more'}
					</ButtonLink>
				{/if} -->
				</div>

				<PrismicImage
					field={item.image}
					class={clsx(
						'opacity-90 shadow-2xl lg:col-span-2 lg:pt-0',
						item.reverse ? 'lg:order-1 lg:translate-x-[15%]' : 'lg:-order-1 lg:translate-x-[-15%]'
					)}
					sizes="(max-width: 768px) 100vw, 50vw"
				/>
			</div>
			<!-- Render content for item -->
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
