<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText, PrismicText } from '@prismicio/svelte';
	import clsx from 'clsx';

	export let slice: Content.CertificateSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<h2 class="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
		<PrismicRichText field={slice.primary.heading} />
	</h2>
	<div class="mx-auto mt-6 max-w-md text-balance text-center text-gray-300">
		<PrismicRichText field={slice.primary.body} />
	</div>

	<dev class="mt-20 grid gap-16">
		{#each slice.primary.cert as item, index}
			<!-- Render content for item 
			
			-->
			<div
				class="group relative grid grid-cols-2 gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100"
			>
				<div class="col-span-1 m-auto flex flex-col justify-center gap-4">
					<h3 class="text-4xl">
						<PrismicText field={item.subheading} />
					</h3>
					<div class="max-w-md">
						<PrismicRichText field={item.description} />
					</div>
				</div>
				<!--  -->
				<div class={clsx('relative col-span-1 m-auto', index % 2 && '-order-1')}>
					<!-- <div> -->
					<div class="image-glow -bottom-8 -left-4 bg-orange-500"></div>
					<div class="image-glow -left-4 -top-4 bg-violet-500"></div>

					<!-- sizes="(max-width: 768px) 100vw, 50vw" -->
					<PrismicImage
						field={item.image}
						class="z-20 max-w-56 scale-[.98] rounded-xl transition-transform duration-300 group-hover:scale-100"
					/>
					<!-- </div> -->
				</div>
			</div>
		{/each}
	</dev>
</Bounded>

<style>
	.image-glow {
		@apply absolute h-1/2 w-1/2 rounded-full opacity-30 mix-blend-screen blur-3xl transition-opacity duration-500 group-hover:opacity-40;
	}
</style>
