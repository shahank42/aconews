import type { PaginatedArticles } from "./types";

export const fetchArticles = async (page: number, pageSize: number) => {
	const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/news`;
	if (!baseUrl) {
		throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
	}

	const params = new URLSearchParams({
		category: "general",
		country: "us",
		language: "en",
		page: page.toString(),
		pageSize: pageSize.toString(),
	});

	try {
		const res = await fetch(`${baseUrl}?${params}`);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data = await res.json();
		if (!data || !Array.isArray(data.articles)) {
			throw new Error("Invalid data format received from the server");
		}
		return data as PaginatedArticles;
	} catch (error) {
		throw new Error("Failed to fetch articles. Please try again later.");
	}
};
