export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/ai-agents/public';

export const api = {
  articles: `${API_BASE_URL}/api/articles`,
  article: (id: number) => `${API_BASE_URL}/api/articles/${id}`,
  news: {
    discover: `${API_BASE_URL}/api/news/discover`,
    create: (title: string) => `${API_BASE_URL}/api/news/create/${encodeURIComponent(title)}`
  }
};
