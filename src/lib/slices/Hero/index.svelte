<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import TriangleGrid from '$lib/components/TriangleGrid.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink, PrismicRichText, PrismicText } from '@prismicio/svelte';

	import { onMount } from 'svelte';
	import gsap from 'gsap';

	export let slice: Content.HeroSlice;

	onMount(() => {
		const t1 = gsap.timeline({
			defaults: {
				// duration: 1,
				ease: 'power2.inOut'
				// yoyo: true,
				// repeat: -1,
				// paused: true,
				// stagger: {
				// 	amount: 0.1
				// }
			}
		});

		t1.fromTo('.hero__heading', { scale: 0.5 }, { scale: 1, opacity: 1, duration: 1.4 });

		t1.fromTo('.hero__body', { y: 20 }, { y: 0, opacity: 1, duration: 1.2 }, '-=0.6');

		t1.fromTo('.hero__button', { scale: 1.5 }, { scale: 1, opacity: 1, duration: 1.3 }, '-=0.8');
		t1.fromTo('.hero__image', { y: 100 }, { y: 0, opacity: 1, duration: 1.3 }, '+=0.3');
		t1.fromTo('.hero__glow', { scale: 0.5 }, { scale: 1, opacity: 1, duration: 1.2 }, '-=1');

		gsap.to('.hero__glow__one', {
			ease: 'power2.inOut',
			repeat: -1,
			repeatDelay: 0,
			keyframes: [
				{ top: '0%', left: '33%', duration: 0 },
				{ top: '33%', left: '33%', duration: 2 },
				{ top: ' 33%', left: '0%', duration: 3 },
				{ top: '0%', left: '0%', duration: 2 },
				{ top: '0%', left: '33%', duration: 3 }
			]
		});

		gsap.to('.hero__glow__two', {
			ease: 'power2.inOut',
			repeat: -1,
			repeatDelay: 0,
			keyframes: [
				{ top: ' 33%', left: '0%', duration: 0 },
				{ top: '0%', left: '0%', duration: 2 },
				{ top: '0%', left: '33%', duration: 3 },
				{ top: '33%', left: '33%', duration: 2 },
				{ top: ' 33%', left: '0%', duration: 3 }
			]
		});
	});
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="relative text-center">
		<TriangleGrid />

		{#if slice.primary.image}
			<div class="glass-container hero__image m-auto mt-5 w-fit opacity-0">
				<div
					class="hero__glow hero__glow__one absolute left-1/3 top-0 -z-10 h-2/3 w-2/3 bg-violet-700/50 opacity-0 mix-blend-screen blur-[120px] filter md:blur-3xl"
				></div>
				<div
					class="hero__glow hero__glow__two absolute left-0 top-1/3 -z-10 h-2/3 w-2/3 bg-orange-600/50 opacity-0 mix-blend-screen blur-[120px] filter md:blur-3xl"
				></div>
				<PrismicImage class="w-96 rounded-lg" field={slice.primary.image} />
			</div>
		{/if}
		{#if slice.primary.heading}
			<h1 class="hero__heading mt-5 text-balance text-5xl font-medium md:text-7xl">
				<PrismicText field={slice.primary.heading} />
			</h1>
		{/if}

		{#if slice.primary.body}
			<p class="hero__body mx-auto mt-6 max-w-md text-balance text-gray-300 opacity-0">
				<PrismicText field={slice.primary.body} />
			</p>
		{/if}

		{#if slice.primary.button_link}
			<ButtonLink class="hero__button mt-8 opacity-0" field={slice.primary.button_link}>
				{slice.primary.button_lable}
			</ButtonLink>
			<ButtonLink class="hero__button mt-8 opacity-0" field={slice.primary.cv_file}>
				{slice.primary.cv_lable}
			</ButtonLink>
		{/if}
	</div>
</Bounded>
