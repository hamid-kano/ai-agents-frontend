'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data.data || []);
        setFilteredArticles(data.data || []);
      });
  }, []);

  const handleSearch = async () => {
    const topics = [
      'آخر أخبار الذكاء الاصطناعي',
      'تحديثات ChatGPT الجديدة',
      'إطلاق iPhone 16',
      'تقنية الحوسبة الكمية',
      'أحدث التقنيات في 2024'
    ];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    try {
      const res = await fetch('http://localhost:8000/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: randomTopic })
      });
      const article = await res.json();
      window.location.href = `/article/${article.id}`;
    } catch (error) {
      alert('حدث خطأ');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">مدونة تقنية AI</h1>
          <Link href="/create" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            خبر جديد
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={handleSearch}
            className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg shadow-sm"
          >
            🔍 ابحث عن خبر تقني بالذكاء الاصطناعي
          </button>
        </div>

        <div className="grid gap-6">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">لا توجد نتائج</p>
              <Link href="/create" className="text-blue-600 hover:text-blue-700">أنشئ أول خبر</Link>
            </div>
          ) : (
            filteredArticles.map((article: any) => (
              <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-bold mb-3 text-slate-800">{article.topic}</h2>
                <div className="text-gray-700 mb-4 line-clamp-3 prose prose-sm max-w-none">
                  <ReactMarkdown>{`${article.content.substring(0, 200)}...`}</ReactMarkdown>
                </div>
                <Link href={`/article/${article.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium">
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
