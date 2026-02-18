'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateArticle() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      const article = await res.json();
      router.push(`/article/${article.id}`);
    } catch (error) {
      alert('حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-600">مدونة تقنية AI</h1>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6">إنشاء مقال جديد</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">موضوع المقال</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="مثال: مستقبل الذكاء الاصطناعي في البرمجة"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>ملاحظة:</strong> سيقوم الوكلاء الأذكياء بـ:
              </p>
              <ul className="text-sm text-blue-700 mt-2 mr-4 list-disc">
                <li>البحث عن الموضوع</li>
                <li>كتابة مقال شامل</li>
                <li>تحرير ومراجعة المحتوى</li>
                <li>تحسين SEO</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-bold disabled:bg-gray-400"
            >
              {loading ? 'جاري الإنشاء...' : 'إنشاء المقال بالذكاء الاصطناعي'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
