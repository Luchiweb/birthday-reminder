import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

interface UserData {
  date: string;
  friends: Friend[];
}

interface Friend {
  name: string;
  date: string;
}

interface DataProviderProps {
  children: ReactNode;
}

interface Context {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export const DataContext = createContext<Context>({ userData: { date: '', friends: [] }, setUserData: () => {} });

function DataProvider({ children }: DataProviderProps) {
  const [userData, setUserData] = useState<UserData>({ date: '', friends: [] });

  useEffect(() => {
    const userData: UserData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.date) {
      setUserData(userData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log(userData);
  }, [userData]);

  return <DataContext.Provider value={{ userData, setUserData }}>{children}</DataContext.Provider>;
}

export default DataProvider;
