import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { UserData } from '../interfaces/userdata';
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
  }, [userData]);

  return <DataContext.Provider value={{ userData, setUserData }}>{children}</DataContext.Provider>;
}

export default DataProvider;
