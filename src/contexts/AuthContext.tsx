import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Mock user type
interface User {
  uid: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  currentUser: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is stored in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('explaindev_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock sign in function
  async function signIn(email: string, password: string) {
    // In a real app, this would call Firebase or your auth service
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock validation (in a real app, this would be done on the server)
        if (email === 'demo@example.com' && password === 'password') {
          const user = { uid: '1', email, displayName: 'Demo User' };
          setCurrentUser(user);
          localStorage.setItem('explaindev_user', JSON.stringify(user));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  // Mock sign up function
  async function signUp(email: string, password: string, name: string) {
    // In a real app, this would call Firebase or your auth service
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const user = { uid: Date.now().toString(), email, displayName: name };
        setCurrentUser(user);
        localStorage.setItem('explaindev_user', JSON.stringify(user));
        resolve();
      }, 1000);
    });
  }

  // Mock sign out function
  async function signOut() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCurrentUser(null);
        localStorage.removeItem('explaindev_user');
        resolve();
      }, 500);
    });
  }

  const value = {
    currentUser,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
