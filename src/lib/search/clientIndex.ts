export async function loadSearchIndex() {
	const res = await fetch('/api/search-index');
	if (!res.ok) return [];
	const data = await res.json();
	return data;
}
