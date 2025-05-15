import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Code, Database, Search, Server, Terminal } from 'lucide-react';
import TermCard from '../components/TermCard';
import { useTerms } from '../contexts/TermsContext';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { terms, loading } = useTerms();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filteredTerms = terms.filter(term => {
    const matchesSearch = !searchQuery || 
      term.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || term.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All', icon: <Terminal size={18} /> },
    { id: 'frontend', name: 'Frontend', icon: <Code size={18} /> },
    { id: 'backend', name: 'Backend', icon: <Server size={18} /> },
    { id: 'database', name: 'Database', icon: <Database size={18} /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Developer Terms, <span className="text-indigo-600">Simplified</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Clear explanations for technical concepts with real-world analogies
        </p>
        
        {/* Main Search */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl bg-white focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              placeholder="Search for any technical term..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Search
            </button>
          </div>
        </form>
      </section>

      {/* Categories */}
      <section className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Terms Grid */}
      <section>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading terms...</p>
          </div>
        ) : filteredTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTerms.map((term) => (
              <TermCard key={term.id} term={term} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No terms found matching your search.</p>
            <p className="mt-2 text-gray-500">Try a different search term or category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
