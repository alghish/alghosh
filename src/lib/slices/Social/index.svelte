<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicText, PrismicRichText, PrismicLink } from '@prismicio/svelte';

	import background from './background.jpg';

	import IconGithub from '~icons/fa-brands/github-alt';
	import IconLinkedin from '~icons/fa-brands/linkedin';
	// import IconTwitter from '~icons/fa-brands/twitter-square';
	import IconEmail from '~icons/ph/envelope-bold';
	import IconTwitter from '~icons/ph/x-logo-fill';

	const icons = {
		github: IconGithub,
		linkedin: IconLinkedin,
		twitter: IconTwitter,
		email: IconEmail
		// Add more social icons as needed
	};

	export let slice: Content.SocialSlice;
</script>

<Bounded
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="relative overflow-hidden"
>
	<img src={background} alt="" class="inset- absolute h-full w-full object-cover" />

	<div class="relative">
		<h2
			class="mx-auto max-w-2xl text-balance bg-gradient-to-b from-violet-50 to-violet-300 bg-clip-text py-2 text-center text-5xl font-medium text-transparent md:text-7xl"
		>
			<PrismicText field={slice.primary.heading} />
		</h2>

		<div class="mx-auto mt-6 max-w-md text-balance text-center text-gray-300">
			<PrismicRichText field={slice.primary.body} />
		</div>

		<div class="mt-20 flex flex-col items-center md:flex-row">
			{#each slice.primary.social_icons as item, index}
				<PrismicLink field={item.social_link}>
					<div
						class="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-violet-50/30 bg-violet-50/25 p-3 text-3xl text-violet-100 opacity-40 md:text-3xl lg:text-5xl"
					>
						{#if item.icons}
							<svelte:component this={icons[item.icons]} />
						{/if}
					</div>
					<!-- Render content for item -->
				</PrismicLink>

				{#if index != slice.primary.social_icons.length - 1}
					<div class="signal-line"></div>
				{/if}
			{/each}
		</div>
	</div>
</Bounded>
