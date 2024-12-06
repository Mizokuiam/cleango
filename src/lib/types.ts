export interface User {
  id: string;
  email: string;
  role: 'resident' | 'provider';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}