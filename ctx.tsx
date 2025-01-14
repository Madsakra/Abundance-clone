import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the user profile data
interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatarUrl: string; // Optional
  age: number; // Optional
}

// Define the context value structure
interface UserProfileContextValue {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

// Create the context with a default value of null
const UserProfileContext = createContext<UserProfileContextValue | undefined>(undefined);

// Provider component
interface UserProfileProviderProps {
  children: ReactNode;
}

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({ children }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(null);

  // Function to set user profile
  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
  };

  // Function to clear user profile
  const clearProfile = () => {
    setProfileState(null);
  };

  return (
    <UserProfileContext.Provider value={{ profile, setProfile, clearProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

// Custom hook to use the UserProfileContext
export const useUserProfile = (): UserProfileContextValue => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
