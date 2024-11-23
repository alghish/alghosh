<script>
	import { PrismicImage, PrismicRichText, PrismicText, SliceZone } from '@prismicio/svelte';

	import { components } from '$lib/slices';
	import Bounded from '$lib/components/Bounded.svelte';
	import TriangleGrid from '$lib/components/TriangleGrid.svelte';

	export let data;
	console.log('🚀 ~ data:', data);
</script>

<Bounded>
	<div class="relative grid w-full place-items-center text-center">
		<TriangleGrid />

		<!--  -->
		<h1 class="md:text-7x1 text-5xl font-medium">
			<PrismicText field={data.page.data.heading} />
			<span class="block text-lg text-yellow-500">Case Study</span>
		</h1>
		<p
			class="mb-4 mt-8 max-w-xl text-lg
			text-slate-300"
		>
			<PrismicText field={data.page.data.description} />
		</p>
		<PrismicImage field={data.page.data.image} class="logo-image rounded-lgopacity-0 max-w-96" />
		<!--  -->
	</div>

	<div class="mx-auto">
		<SliceZone slices={data.page.data.slices} {components} />
	</div>
</Bounded>
