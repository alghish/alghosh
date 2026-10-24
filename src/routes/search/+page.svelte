<script lang="ts">
	import Search from '$lib/components/Search.svelte';
</script>

<svelte:head>
	<title>Search</title>
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
	<p class="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-violet-300">Explore</p>
	<h1 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Search</h1>
	<p class="mt-3 max-w-xl text-gray-400">
		Find projects, case studies, and other content across the site.
	</p>
	<Search />
</section>
