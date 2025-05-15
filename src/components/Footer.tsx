import { Link } from 'react-router-dom';
import { Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-indigo-600 font-bold text-xl mb-2">ExplainDev.ai</div>
            <p className="text-gray-600 text-sm">
              A dictionary for technical terms with simple explanations
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-12 items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-500 hover:text-indigo-600">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600">
                <Twitter size={20} />
              </a>
            </div>
            
            <nav className="flex flex-wrap justify-center space-x-4 text-sm">
              <Link to="/" className="text-gray-600 hover:text-indigo-600">
                Home
              </Link>
              <Link to="/" className="text-gray-600 hover:text-indigo-600">
                About
              </Link>
              <Link to="/" className="text-gray-600 hover:text-indigo-600">
                Privacy
              </Link>
              <Link to="/" className="text-gray-600 hover:text-indigo-600">
                Terms
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ExplainDev.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
