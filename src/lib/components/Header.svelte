<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import WordMark from './WordMark.svelte';
	import ButtonLink from './ButtonLink.svelte';
	import clsx from 'clsx';

	import PhXBold from '~icons/ph/x-bold';
	import PhListBold from '~icons/ph/list-bold';
	import { asLink } from '@prismicio/client';
	import { page } from '$app/stores';

	/** @type {import("@prismicio/client").Content.SettingsDocument} */
	export let settings;

	let isOpen = false;
	const toggleMenu = () => {
		isOpen = !isOpen;
	};
	const closeMenu = () => {
		isOpen = false;
	};

	// lazy-load Search component to avoid client bundle cost by default
	let Search: typeof import('./Search.svelte').default | null = null;
	let mobileSearchTrigger: HTMLButtonElement;
	let desktopSearchTrigger: HTMLButtonElement;
	const loadSearch = async () => {
		if (Search) return;
		Search = (await import('$lib/components/Search.svelte')).default;
	};

	let showSearch = false;
	const openSearch = async () => {
		await loadSearch();
		showSearch = true;
	};
	const closeSearch = () => {
		showSearch = false;
		if (window.matchMedia('(min-width: 768px)').matches) {
			desktopSearchTrigger?.focus();
		} else {
			mobileSearchTrigger?.focus();
		}
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && showSearch) {
			closeSearch();
			return;
		}

		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			openSearch();
		}
	};

	const isActive = (link: import('@prismicio/client').LinkField) => {
		const path = asLink(link);
		return path && $page.url.pathname.includes(path);
	};
</script>

<svelte:window on:keydown={handleKeydown} />

<header class="p-4 md:p-6">
	<nav
		class="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center"
		aria-label="Main"
	>
		<div class="flex items-center justify-between">
			<a href="/" on:click={closeMenu} class="z-50">
				<WordMark />
				<span class="sr-only">{settings.data.site_title} home page</span>
			</a>

			<button
				aria-expanded={isOpen}
				type="button"
				class="block p-2 text-3xl text-white md:hidden"
				on:click={toggleMenu}
			>
				<PhListBold />
			</button>
			<button
				bind:this={mobileSearchTrigger}
				type="button"
				class="ml-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/30 hover:bg-white/10 md:hidden"
				on:click={openSearch}
				aria-label="Open search"
				aria-expanded={showSearch}
			>
				<svg
					class="h-5 w-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
					aria-hidden="true"
				>
					<circle cx="11" cy="11" r="7" />
					<path d="m20 20-4-4" stroke-linecap="round" />
				</svg>
			</button>
		</div>

		<div class="hidden md:flex md:items-center md:ml-6">
			<button
				bind:this={desktopSearchTrigger}
				type="button"
				on:click={openSearch}
				aria-expanded={showSearch}
				class="inline-flex min-h-11 items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-4 text-sm text-gray-200 transition hover:border-white/30 hover:bg-white/10"
			>
				<svg
					class="h-4 w-4 text-gray-400"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
					aria-hidden="true"
				>
					<circle cx="11" cy="11" r="7" />
					<path d="m20 20-4-4" stroke-linecap="round" />
				</svg>
				<span>Search</span>
				<kbd class="rounded border border-white/10 px-1.5 py-0.5 text-xs text-gray-500">⌘ K</kbd>
			</button>
		</div>

		{#if showSearch && Search}
			<div class="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-gray-950/80 px-4 py-[min(12vh,6rem)] backdrop-blur-sm">
				<button
					class="absolute inset-0 h-full w-full cursor-default"
					type="button"
					on:click={closeSearch}
					aria-label="Close search"
				></button>
				<section
					class="relative z-10 w-full max-w-2xl rounded-3xl border border-white/10 bg-gray-900 p-5 shadow-2xl shadow-black/40 sm:p-7"
					role="dialog"
					aria-modal="true"
					aria-labelledby="search-dialog-title"
					tabindex="-1"
				>
					<div class="mb-5 flex items-start justify-between gap-4">
						<div>
							<h2 id="search-dialog-title" class="text-xl font-semibold text-white">Search</h2>
							<p class="mt-1 text-sm text-gray-400">Find anything across the site.</p>
						</div>
						<button
							class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300"
							type="button"
							on:click={closeSearch}
							aria-label="Close search"
						>
							<svg
								class="h-5 w-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								aria-hidden="true"
							>
								<path d="m6 6 12 12M18 6 6 18" stroke-linecap="round" />
							</svg>
						</button>
					</div>
					<svelte:component this={Search} autoFocus={showSearch} />
				</section>
			</div>
		{/if}
		<div
			class={clsx(
				'fixed inset-0 z-40 flex flex-col items-end bg-gray-950 pr-4 pt-6 transition-transform duration-300 ease-in-out md:hidden',
				isOpen ? 'translate-x-0' : 'translate-x-[100%]'
			)}
		>
			<button
				aria-expanded={isOpen}
				type="button"
				class="block p-2 text-3xl text-white md:hidden"
				on:click={toggleMenu}
			>
				<PhXBold />
			</button>
			<ul class="grid justify-items-end gap-8">
				<!-- <ul class="flex-col gap-6 md:hidden"> -->
				{#each settings.data.navigation as item (item.label)}
					<li>
						{#if item.cta_button}
							<ButtonLink
								on:click={closeMenu}
								field={item.link}
								aria-current={isActive(item.link) ? 'page' : undefined}
							>
								{item.label}
							</ButtonLink>
						{:else}
							<PrismicLink
								on:click={closeMenu}
								field={item.link}
								class="block min-h-11 px-3 text-3xl first:mt-8"
								aria-current={isActive(item.link) ? 'page' : undefined}
							>
								{item.label}
							</PrismicLink>
						{/if}
					</li>
				{/each}
			</ul>
		</div>

		<!-- Desktop Nav -->
		<ul class="hidden gap-6 md:flex">
			{#each settings.data.navigation as item (item.label)}
				<li>
					{#if item.cta_button}
						<ButtonLink field={item.link} aria-current={isActive(item.link) ? 'page' : undefined}>
							{item.label}
						</ButtonLink>
					{:else}
						<PrismicLink
							field={item.link}
							class="inline-flex min-h-11 items-center"
							aria-current={isActive(item.link) ? 'page' : undefined}
						>
							{item.label}
						</PrismicLink>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
</header>
