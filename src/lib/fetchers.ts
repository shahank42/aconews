import type { NewsFilterFormValues } from "@/components/news-filters";
import type { PaginatedArticles } from "./types";
import type { SearchFilterFormValues } from "@/components/search-filters";

export const fetchArticles = async (
	page: number,
	pageSize: number,
	filters: NewsFilterFormValues,
) => {
	const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/news`;
	if (!baseUrl) {
		throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
	}

	const params = new URLSearchParams({
		category: filters.category || "general",
		country: filters.country || "us",
		language: filters.language || "en",
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

export const searchArticles = async (
	query: string,
	page: number,
	pageSize: number,
	filters: SearchFilterFormValues,
) => {
	const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
	if (!baseUrl) {
		throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
	}

	try {
		const params = new URLSearchParams({
			query: query,
			page: page.toString(),
			pageSize: pageSize.toString(),
			language: filters.language || "en",
			country: filters.country || "us",
		});

		const res = await fetch(`${baseUrl}/search?${params}`);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data = await res.json();
		return data as PaginatedArticles;
	} catch (error) {
		throw new Error("Failed to search articles. Please try again later.");
	}
};
