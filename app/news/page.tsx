'use client';

import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const discoverNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/news/discover');
      const data = await res.json();
      const newsItems = data.news.split('\n').filter((n: string) => n.trim());
      setNews(newsItems);
    } catch (error) {
      alert('حدث خطأ');
    }
    setLoading(false);
  };

  const createArticle = async (newsTitle: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/news/create/${encodeURIComponent(newsTitle)}`, {
        method: 'POST'
      });
      const article = await res.json();
      window.location.href = `/article/${article.id}`;
    } catch (error) {
      alert('حدث خطأ');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="bg-black/30 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">اكتشف أخبار تقنية</h1>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">← الرئيسية</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={discoverNews}
          disabled={loading}
          className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold text-lg shadow-sm disabled:opacity-50"
        >
          {loading ? '⏳ جاري البحث...' : '🔍 اكتشف أحدث الأخبار التقنية'}
        </button>

        <div className="mt-8 space-y-4">
          {news.map((item, i) => (
            <div key={i} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 p-4 hover:border-cyan-500/40 transition-all">
              <div className="text-gray-300 mb-3 prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{item}</ReactMarkdown>
              </div>
              <button
                onClick={() => createArticle(item)}
                className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                ✍️ صياغة الخبر
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
