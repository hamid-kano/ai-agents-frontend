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
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-slate-800">مدونة تقنية AI</h1>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">خبر تقني جديد</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-slate-700 font-bold mb-2">موضوع الخبر التقني</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="مثال: تحديثات ChatGPT الجديدة، إطلاق iPhone 16، تقنية الكم"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900 font-semibold mb-2">ملاحظة: سيقوم الوكلاء الأذكياء بـ:</p>
              <ul className="text-sm text-blue-800 mr-4 list-disc space-y-1">
                <li>البحث عن آخر الأخبار والتحديثات</li>
                <li>كتابة خبر مختصر ومباشر</li>
                <li>مراجعة الدقة والوضوح</li>
                <li>تحسين SEO للخبر</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'جاري كتابة الخبر...' : 'إنشاء خبر تقني بالذكاء الاصطناعي'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
