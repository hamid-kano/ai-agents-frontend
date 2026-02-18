'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data.data || []);
        setFilteredArticles(data.data || []);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="bg-black/30 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">مدونة تقنية AI</h1>
          <div className="flex gap-3">
            <Link href="/news" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all">
              🔍 اكتشف أخبار
            </Link>
            <Link href="/create" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              ✍️ خبر جديد
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">لا توجد مقالات</p>
              <Link href="/create" className="text-cyan-400 hover:text-cyan-300">أنشئ أول خبر</Link>
            </div>
          ) : (
            filteredArticles.map((article: any) => (
              <div key={article.id} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 p-6 hover:border-cyan-500/40 transition-all">
                <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">{article.topic}</h2>
                <div className="text-gray-300 mb-4 line-clamp-3 prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{`${article.content.substring(0, 200)}...`}</ReactMarkdown>
                </div>
                <Link href={`/article/${article.id}`} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                  <span>قراءة المزيد</span>
                  <span>←</span>
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
