export type Article = {
	title: string;
	description: string;
	content: string;
	url: string;
	image: string;
	publishedAt: string;
	source: {
		name: string;
		url: string;
	};
};

export type PaginatedArticles = {
	articles: Article[];
	totalArticles: number;
	currentPage: number;
	pageSize: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
};
