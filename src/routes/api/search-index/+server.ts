import { createClient } from '$lib/prismicio';

export const GET = async ({ fetch, cookies }) => {
	const client = createClient({ fetch, cookies });

	const types = ['project', 'case_study', 'page'];

	// Fetch all documents for each type (may be paginated under the hood)
	const results = await Promise.all(
		types.map((t) => (client.getAllByType ? client.getAllByType(t) : client.getAll({ predicates: [] })))
	);

	const docs = results.flat();

	const getText = (field) => {
		if (!field) return '';
		if (typeof field === 'string') return field;
		if (Array.isArray(field)) return field.map((n) => (n?.text ? n.text : (typeof n === 'string' ? n : ''))).join(' ');
		if (typeof field === 'object' && 'text' in field) return String(field.text || '');
		return String(field).slice(0, 300);
	};

	const items = docs.map((doc) => {
		const data = doc.data || {};
		const title = getText(data.title) || getText(data.heading) || doc.uid || doc.id || '';
		let excerpt = '';
		excerpt = getText(data.excerpt) || getText(data.description) || getText(data.body) || '';

		return {
			id: doc.id,
			uid: doc.uid,
			type: doc.type || doc._meta?.type || '',
			title: title.slice(0, 200),
			excerpt: excerpt.slice(0, 500),
			url: doc.url || `/${doc.type || ''}/${doc.uid || ''}`
		};
	});

	return new Response(JSON.stringify(items), {
		headers: { 'Content-Type': 'application/json' }
	});
};
