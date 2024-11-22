export const prerender = 'auto';


import { createClient } from '$lib/prismicio';

export async function load({ fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	// const page = await client.getByUID('page', 'home');
    const settings = await client.getSingle('settings');

	return {
		settings
	};
}


