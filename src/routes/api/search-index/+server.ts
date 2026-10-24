import { createClient } from '$lib/prismicio';

const ignoredFields = new Set([
	'id',
	'url',
	'link_type',
	'type',
	'slice_type',
	'variation',
	'target',
	'dimensions',
	'width',
	'height',
	'embed_url'
]);

function getText(value: unknown): string {
	if (typeof value === 'string') return value;
	if (Array.isArray(value)) return value.map(getText).filter(Boolean).join(' ');
	if (value && typeof value === 'object') {
		return Object.entries(value)
			.filter(([key]) => !ignoredFields.has(key))
			.map(([, nestedValue]) => getText(nestedValue))
			.filter(Boolean)
			.join(' ');
	}
	return '';
}

function getFieldText(data: object, field: string): string {
	return getText(Object.entries(data).find(([key]) => key === field)?.[1]);
}

export const GET = async ({ fetch, cookies }) => {
	const client = createClient({ fetch, cookies });
	const docs = (
		await Promise.all([client.getAllByType('page'), client.getAllByType('case_study')])
	).flat();

	const items = docs.flatMap((doc) => {
		const data = doc.data;
		const pageTitle =
			doc.type === 'case_study' ? getFieldText(data, 'heading') : getFieldText(data, 'title');
		const title = pageTitle || getFieldText(data, 'meta_title') || doc.uid || '';
		const content = getText(data);
		const excerptSource =
			(doc.type === 'case_study' ? getFieldText(data, 'description') : '') ||
			getFieldText(data, 'meta_description') ||
			content.replace(title, '').trim();
		const url =
			doc.url ||
			(doc.type === 'page'
				? doc.uid === 'home'
					? '/'
					: `/${doc.uid}`
				: doc.type === 'case_study'
					? `/case-study/${doc.uid}`
					: '');

		if (!url || !title) return [];

		return [
			{
				id: doc.id,
				uid: doc.uid,
				type: doc.type,
				title: title.slice(0, 200),
				excerpt: excerptSource.replace(/\s+/g, ' ').slice(0, 280),
				content,
				url
			}
		];
	});

	return Response.json(items);
};
