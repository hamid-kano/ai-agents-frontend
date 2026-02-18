'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/articles/${params.id}`)
      .then(res => res.json())
      .then(data => setArticle(data));
  }, [params.id]);

  if (!article) return <div className="text-center py-12 text-gray-400">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="bg-black/30 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">مدونة تقنية AI</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 p-8">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            {article.topic}
          </h1>

          {article.seo_data && (
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-cyan-500/30 rounded-xl p-6 mb-8">
              <h3 className="font-bold mb-3 text-cyan-300 text-lg flex items-center gap-2">
                <Sparkles size={20} />
                <span>معلومات SEO:</span>
              </h3>
              <div className="text-sm text-gray-300 prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{article.seo_data.suggestions}</ReactMarkdown>
              </div>
            </div>
          )}

          <div className="prose prose-xl prose-invert max-w-none
            prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-10
            prose-h1:text-5xl prose-h1:leading-tight prose-h1:bg-gradient-to-r prose-h1:from-cyan-300 prose-h1:to-purple-300 prose-h1:bg-clip-text prose-h1:text-transparent
            prose-h2:text-4xl prose-h2:leading-snug prose-h2:bg-gradient-to-r prose-h2:from-cyan-300 prose-h2:to-purple-300 prose-h2:bg-clip-text prose-h2:text-transparent
            prose-h3:text-3xl prose-h3:leading-snug prose-h3:text-cyan-300
            prose-h4:text-2xl prose-h4:text-purple-300
            prose-p:text-gray-200 prose-p:text-lg prose-p:leading-loose prose-p:mb-6
            prose-strong:text-cyan-300 prose-strong:font-bold
            prose-ul:text-gray-200 prose-ul:text-lg prose-ul:leading-relaxed prose-ul:space-y-3 prose-ul:my-6
            prose-ol:text-gray-200 prose-ol:text-lg prose-ol:leading-relaxed prose-ol:space-y-3 prose-ol:my-6
            prose-li:my-2
            prose-li:marker:text-purple-400 prose-li:marker:text-xl
            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
            prose-code:text-pink-300 prose-code:bg-slate-900/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-base
            prose-blockquote:border-r-4 prose-blockquote:border-cyan-500 prose-blockquote:pr-6 prose-blockquote:text-gray-300 prose-blockquote:italic">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          <div className="mt-8 pt-6 border-t border-purple-500/20">
            <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <ArrowRight size={18} />
              <span>العودة للمقالات</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
