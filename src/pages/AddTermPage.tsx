import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Squircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTerms } from '../contexts/TermsContext';

const AddTermPage = () => {
  const { currentUser } = useAuth();
  const { addTerm } = useTerms();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'frontend',
    shortDescription: '',
    simpleExplanation: '',
    technicalExplanation: '',
    analogy: '',
    codeExample: '',
    tags: '',
  });

  // Redirect if not logged in
  if (!currentUser) {
    navigate('/signin');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'name' && !formData.slug) {
      // Auto-generate slug from name
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      setFormData({
        ...formData,
        [name]: value,
        slug,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.slug || !formData.shortDescription || !formData.simpleExplanation) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      await addTerm({
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        createdBy: currentUser.uid,
        createdAt: new Date().toISOString(),
        resources: [],
      });
      
      navigate(`/term/${formData.slug}`);
    } catch (err) {
      setError('Failed to add term. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Term</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
            <Squircle className="flex-shrink-0 mr-3 h-5 w-5" />
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Term Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., REST API"
              />
            </div>
            
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug *
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                required
                value={formData.slug}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., rest-api"
              />
              <p className="mt-1 text-sm text-gray-500">
                This will be used in the URL: explaindev.ai/term/{formData.slug || 'your-term-slug'}
              </p>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="devops">DevOps</option>
                <option value="general">General</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Short Description *
              </label>
              <input
                id="shortDescription"
                name="shortDescription"
                type="text"
                required
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="A brief one-sentence description"
              />
            </div>
            
            <div>
              <label htmlFor="simpleExplanation" className="block text-sm font-medium text-gray-700 mb-1">
                Simple Explanation *
              </label>
              <textarea
                id="simpleExplanation"
                name="simpleExplanation"
                required
                value={formData.simpleExplanation}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Explain the term in simple, non-technical language"
              />
            </div>
            
            <div>
              <label htmlFor="technicalExplanation" className="block text-sm font-medium text-gray-700 mb-1">
                Technical Explanation
              </label>
              <textarea
                id="technicalExplanation"
                name="technicalExplanation"
                value={formData.technicalExplanation}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Provide a more detailed technical explanation (supports Markdown)"
              />
            </div>
            
            <div>
              <label htmlFor="analogy" className="block text-sm font-medium text-gray-700 mb-1">
                Real-World Analogy
              </label>
              <textarea
                id="analogy"
                name="analogy"
                value={formData.analogy}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Provide a real-world analogy to help understand the concept (supports Markdown)"
              />
            </div>
            
            <div>
              <label htmlFor="codeExample" className="block text-sm font-medium text-gray-700 mb-1">
                Code Example
              </label>
              <textarea
                id="codeExample"
                name="codeExample"
                value={formData.codeExample}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                placeholder="// Add a code example here"
              />
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., api, http, web (comma separated)"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Term'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTermPage;
