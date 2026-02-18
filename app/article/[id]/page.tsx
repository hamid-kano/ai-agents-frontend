'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/articles/${params.id}`)
      .then(res => res.json())
      .then(data => setArticle(data));
  }, [params.id]);

  if (!article) return <div className="text-center py-12">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-600">مدونة تقنية AI</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-4">{article.topic}</h1>

          {article.seo_data && (
            <div className="bg-gray-50 border rounded-lg p-4 mb-6">
              <h3 className="font-bold mb-2">معلومات SEO:</h3>
              <div className="text-sm text-gray-700 whitespace-pre-wrap">
                {article.seo_data.suggestions}
              </div>
            </div>
          )}

          <div className="prose max-w-none whitespace-pre-wrap">
            {article.content}
          </div>

          <div className="mt-8 pt-6 border-t">
            <Link href="/" className="text-blue-500 hover:underline">
              ← العودة للمقالات
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
