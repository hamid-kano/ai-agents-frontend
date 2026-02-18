'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data.data || []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">مدونة تقنية AI</h1>
          <Link href="/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            مقال جديد
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">لا توجد مقالات بعد</p>
              <Link href="/create" className="text-blue-500 hover:underline">أنشئ أول مقال</Link>
            </div>
          ) : (
            articles.map((article: any) => (
              <div key={article.id} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-2">{article.topic}</h2>
                <p className="text-gray-600 mb-4">{article.content.substring(0, 200)}...</p>
                <Link href={`/article/${article.id}`} className="text-blue-500 hover:underline">
                  قراءة المزيد ←
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
