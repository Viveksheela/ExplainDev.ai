import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, Pencil, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useTerms } from '../contexts/TermsContext';
import { useAuth } from '../contexts/AuthContext';
import { Term } from '../types/Term';

const TermPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { terms, loading } = useTerms();
  const { currentUser } = useAuth();
  const [term, setTerm] = useState<Term | null>(null);
  const [relatedTerms, setRelatedTerms] = useState<Term[]>([]);

  useEffect(() => {
    if (!loading && terms.length > 0 && slug) {
      const foundTerm = terms.find(t => t.slug === slug);
      if (foundTerm) {
        setTerm(foundTerm);
        
        // Find related terms (same category or with matching tags)
        const related = terms
          .filter(t => 
            t.id !== foundTerm.id && 
            (t.category === foundTerm.category || 
             t.tags.some(tag => foundTerm.tags.includes(tag)))
          )
          .slice(0, 3);
        
        setRelatedTerms(related);
      }
    }
  }, [slug, terms, loading]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading term details...</p>
      </div>
    );
  }

  if (!term) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Term Not Found</h2>
        <p className="text-gray-600 mb-6">The term you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to All Terms
        </Link>

        {/* Term Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full
              ${
                term.category === 'frontend'
                  ? 'bg-blue-100 text-blue-700'
                  : term.category === 'backend'
                  ? 'bg-green-100 text-green-700'
                  : term.category === 'database'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-purple-100 text-purple-700'
              }`
            }>
              {term.category.charAt(0).toUpperCase() + term.category.slice(1)}
            </span>
            <div className="flex space-x-3">
              <button className="text-gray-500 hover:text-indigo-600">
                <Bookmark size={20} />
              </button>
              <button className="text-gray-500 hover:text-indigo-600">
                <Share2 size={20} />
              </button>
              {currentUser && (
                <Link to={`/edit-term/${term.slug}`} className="text-gray-500 hover:text-indigo-600">
                  <Pencil size={20} />
                </Link>
              )}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{term.name}</h1>
          <p className="text-xl text-gray-600">{term.shortDescription}</p>
        </div>

        {/* Term Content */}
        <div className="prose prose-indigo max-w-none mb-12">
          <div className="bg-indigo-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">In Simple Terms</h3>
            <p className="text-gray-800">{term.simpleExplanation}</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Technical Explanation</h2>
          <ReactMarkdown>{term.technicalExplanation}</ReactMarkdown>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Real-World Analogy</h2>
          <div className="bg-amber-50 rounded-lg p-6 mb-8">
            <ReactMarkdown>{term.analogy}</ReactMarkdown>
          </div>

          {term.codeExample && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Code Example</h2>
              <pre className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
                <code>{term.codeExample}</code>
              </pre>
            </>
          )}

          {term.resources && term.resources.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Further Resources</h2>
              <ul>
                {term.resources.map((resource, index) => (
                  <li key={index} className="mb-2">
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 underline"
                    >
                      {resource.title}
                    </a>
                    {resource.description && (
                      <p className="text-gray-600 text-sm">{resource.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Tags */}
        {term.tags && term.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Tags</h3>
            <div className="flex flex-wrap gap-2">
              {term.tags.map((tag, index) => (
                <Link 
                  key={index} 
                  to={`/?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Terms</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTerms.map(relatedTerm => (
                <Link 
                  key={relatedTerm.id} 
                  to={`/term/${relatedTerm.slug}`} 
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <h4 className="font-medium text-gray-900">{relatedTerm.name}</h4>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{relatedTerm.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermPage;
