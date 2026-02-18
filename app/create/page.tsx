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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="bg-black/30 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">مدونة تقنية AI</h1>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 p-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">خبر تقني جديد</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-cyan-300 font-bold mb-2">موضوع الخبر التقني</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-cyan-500 text-gray-200"
                placeholder="مثال: تحديثات ChatGPT الجديدة، إطلاق iPhone 16، تقنية الكم"
              />
            </div>

            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-cyan-500/30 rounded-xl p-4 mb-6">
              <p className="text-sm text-cyan-300 font-semibold mb-2">ملاحظة: سيقوم الوكلاء الأذكياء بـ:</p>
              <ul className="text-sm text-gray-300 mr-4 list-disc space-y-1">
                <li>البحث عن آخر الأخبار والتحديثات</li>
                <li>كتابة خبر مختصر ومباشر</li>
                <li>مراجعة الدقة والوضوح</li>
                <li>تحسين SEO للخبر</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'جاري كتابة الخبر...' : 'إنشاء خبر تقني بالذكاء الاصطناعي'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
