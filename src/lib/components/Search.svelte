<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { loadSearchIndex } from '$lib/search/clientIndex';
	import type { SearchResult } from '$lib/search/clientIndex';

	export let autoFocus = false;

	let query = '';
	let results: SearchResult[] = [];
	let searchIndex: SearchResult[] = [];
	let fuse: import('fuse.js').default<SearchResult> | undefined;
	let inputEl: HTMLInputElement | null = null;
	let status: 'loading' | 'ready' | 'error' = 'loading';

	$: if (autoFocus) {
		tick().then(() => inputEl?.focus());
	}

	onMount(async () => {
		try {
			searchIndex = await loadSearchIndex();
			const Fuse = (await import('fuse.js')).default;
			fuse = new Fuse(searchIndex, {
				keys: ['title', 'excerpt', 'content'],
				threshold: 0.35,
				includeScore: true,
				ignoreLocation: true,
				minMatchCharLength: 2
			});
			status = 'ready';
			search();
		} catch (error) {
			console.error('Unable to load the search index.', error);
			status = 'error';
		}
	});

	function search() {
		const value = query.trim();
		results = value && fuse ? fuse.search(value, { limit: 10 }).map(({ item }) => item) : [];
	}

	function clearSearch() {
		query = '';
		results = [];
		inputEl?.focus();
	}
</script>

<form class="w-full" role="search" on:submit|preventDefault={search}>
	<div
		class="flex items-center gap-3 rounded-2xl border border-white/15 bg-gray-950 px-4 py-3 shadow-inner shadow-black/20 transition focus-within:border-violet-300/70 focus-within:ring-2 focus-within:ring-violet-300/20"
	>
		<svg
			class="h-5 w-5 shrink-0 text-gray-400"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			aria-hidden="true"
		>
			<circle cx="11" cy="11" r="7" />
			<path d="m20 20-4-4" stroke-linecap="round" />
		</svg>
		<input
			bind:this={inputEl}
			bind:value={query}
			on:input={search}
			class="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-gray-500"
			type="search"
			placeholder="Search all content…"
			aria-label="Search all content"
			autocomplete="off"
		/>
		{#if query}
			<button
				class="rounded-md px-2 py-1 text-sm text-gray-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300"
				type="button"
				on:click={clearSearch}
				aria-label="Clear search"
			>
				Clear
			</button>
		{/if}
		<kbd class="hidden rounded-md border border-white/10 px-2 py-1 text-xs text-gray-500 sm:inline">
			Enter
		</kbd>
	</div>
</form>

<div class="mt-4" aria-live="polite">
	{#if status === 'loading'}
		<p class="text-sm text-gray-400">Loading search…</p>
	{:else if status === 'error'}
		<p class="text-sm text-rose-300">Search is temporarily unavailable. Please try again.</p>
	{:else if query.trim().length > 0 && results.length === 0}
		<p class="text-sm text-gray-400">
			{query.trim().length < 2 ? 'Enter at least two characters to search.' : 'No results found. Try a different search.'}
		</p>
	{:else if results.length > 0}
		<p class="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
			{results.length} {results.length === 1 ? 'result' : 'results'}
		</p>
		<ul class="max-h-[min(60vh,32rem)] space-y-2 overflow-y-auto pr-1">
			{#each results as result (result.id)}
				<li>
					<a
						class="group block rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-violet-300/40 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300"
						href={result.url}
					>
						<span class="text-xs font-medium uppercase tracking-[0.12em] text-violet-300">
							{result.type.replaceAll('_', ' ')}
						</span>
						<strong class="mt-1 block text-base font-semibold text-white group-hover:text-violet-100">
							{result.title}
						</strong>
						{#if result.excerpt}
							<span class="mt-1 line-clamp-2 block text-sm leading-relaxed text-gray-400">
								{result.excerpt}
							</span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-sm text-gray-500">Search pages, case studies, and more.</p>
	{/if}
</div>
