import { createContext, useState } from 'react';
import { User } from 'src/models/User';
import { UserContextType } from 'src/models/UserContextType';

const defaultSettings: UserContextType = {
  currentUser: null,
  userModifier: (user: User | null) => {}
};

export const UserContext = createContext<UserContextType>(defaultSettings);

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const userModifier = (user: User | null) => {
    setCurrentUser(user);
  };

  return (
    <UserContext.Provider value={{ currentUser, userModifier }}>
      {children}
    </UserContext.Provider>
  );
};
