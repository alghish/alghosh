export type SearchResult = {
	id: string;
	uid: string;
	type: string;
	title: string;
	excerpt: string;
	content: string;
	url: string;
};

let searchIndexPromise: Promise<SearchResult[]> | undefined;

export async function loadSearchIndex(): Promise<SearchResult[]> {
	if (!searchIndexPromise) {
		searchIndexPromise = fetch('/api/search-index').then((res) => {
			if (!res.ok) {
				throw new Error(`Search index request failed with status ${res.status}.`);
			}
			return res.json() as Promise<SearchResult[]>;
		});
	}

	try {
		return await searchIndexPromise;
	} catch (error) {
		searchIndexPromise = undefined;
		throw error;
	}
}
