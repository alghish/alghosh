<script lang="ts">
	import { onMount } from 'svelte';
	import { loadSearchIndex } from '$lib/search/clientIndex';

	let query = '';
	let results = [] as any[];
	let index: any[] = [];
	let FuseInstance: any = null;

	onMount(async () => {
		// load index from server
		index = await loadSearchIndex();
		if (index.length === 0) return;
		const Fuse = (await import('fuse.js')).default;
		FuseInstance = new Fuse(index, {
			keys: ['title', 'excerpt', 'tags'],
			threshold: 0.35,
			includeScore: true,
			ignoreLocation: true,
			minMatchCharLength: 2
		});
	});

	function doSearch() {
		if (!FuseInstance || !query) {
			results = [];
			return;
		}
		results = FuseInstance.search(query, { limit: 10 }).map((r) => r.item);
	}
</script>

<style>
	/* minimal styling; adjust in project styles */
	.search-input { @apply bg-gray-900 text-white rounded px-3 py-2; }
</style>

<div class="search-component">
	<input
		class="search-input"
		placeholder="Search projects, case studies…"
		bind:value={query}
		on:input={() => doSearch()}
	/>

	{#if results.length}
		<ul class="mt-2 max-h-64 overflow-auto bg-gray-900/80 rounded p-2">
			{#each results as r}
				<li class="py-2">
					<a class="block" href={r.url} >
						<strong>{r.title}</strong>
						<div class="text-sm text-gray-300">{r.excerpt}</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
