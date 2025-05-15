import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Term } from '../types/Term';

interface TermCardProps {
  term: Term;
}

const TermCard = ({ term }: TermCardProps) => {
  return (
    <Link to={`/term/${term.slug}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="mb-2">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full
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
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{term.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{term.shortDescription}</p>
        
        <div className="flex items-center text-indigo-600 font-medium">
          <span>Read more</span>
          <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
};

export default TermCard;
