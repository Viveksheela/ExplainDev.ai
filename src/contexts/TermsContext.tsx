import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Term } from '../types/Term';
import mockTerms from '../data/mockTerms';

interface TermsContextType {
  terms: Term[];
  loading: boolean;
  addTerm: (term: Omit<Term, 'id'>) => Promise<void>;
  updateTerm: (id: string, term: Partial<Term>) => Promise<void>;
  deleteTerm: (id: string) => Promise<void>;
}

const TermsContext = createContext<TermsContextType | undefined>(undefined);

export function useTerms() {
  const context = useContext(TermsContext);
  if (context === undefined) {
    throw new Error('useTerms must be used within a TermsProvider');
  }
  return context;
}

interface TermsProviderProps {
  children: ReactNode;
}

export function TermsProvider({ children }: TermsProviderProps) {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if terms are stored in localStorage
    const storedTerms = localStorage.getItem('explaindev_terms');
    
    if (storedTerms) {
      setTerms(JSON.parse(storedTerms));
    } else {
      // Use mock data if no stored terms
      setTerms(mockTerms);
      localStorage.setItem('explaindev_terms', JSON.stringify(mockTerms));
    }
    
    setLoading(false);
  }, []);

  // Save terms to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('explaindev_terms', JSON.stringify(terms));
    }
  }, [terms, loading]);

  // Add a new term
  async function addTerm(termData: Omit<Term, 'id'>) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newTerm = {
          id: Date.now().toString(),
          ...termData,
        };
        
        setTerms((prevTerms) => [...prevTerms, newTerm]);
        resolve();
      }, 500);
    });
  }

  // Update an existing term
  async function updateTerm(id: string, termData: Partial<Term>) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        setTerms((prevTerms) => {
          const index = prevTerms.findIndex((term) => term.id === id);
          if (index === -1) {
            reject(new Error('Term not found'));
            return prevTerms;
          }
          
          const updatedTerms = [...prevTerms];
          updatedTerms[index] = {
            ...updatedTerms[index],
            ...termData,
            updatedAt: new Date().toISOString(),
          };
          
          return updatedTerms;
        });
        resolve();
      }, 500);
    });
  }

  // Delete a term
  async function deleteTerm(id: string) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setTerms((prevTerms) => prevTerms.filter((term) => term.id !== id));
        resolve();
      }, 500);
    });
  }

  const value = {
    terms,
    loading,
    addTerm,
    updateTerm,
    deleteTerm,
  };

  return (
    <TermsContext.Provider value={value}>
      {children}
    </TermsContext.Provider>
  );
}
