export interface CollectionRequest {
  id: string;
  userId: string;
  address: string;
  contactDetails: {
    name: string;
    phone: string;
    email: string;
  };
  collectionTime: 'morning' | 'evening';
  collectionDate: string;
  subscriptionType: 'single' | 'monthly' | 'annual';
  wasteType: string;
  wasteItems: string[];
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'resident' | 'provider';
  name?: string;
  phone?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}