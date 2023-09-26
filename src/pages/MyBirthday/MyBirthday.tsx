import { useContext, useState } from 'react';
import { DataContext } from '../../providers/DataProvider';
import Timer from './Timer';

function MyBirthday() {
  const [inputValue, setInputValue] = useState<string>('');
  const { userData, setUserData } = useContext(DataContext);

  const handleData = () => {
    setUserData((prev) => ({ ...prev, date: inputValue }));
  };

  return (
    <>
      {userData.date ? (
        <div>
          <Timer date={userData.date}></Timer>
        </div>
      ) : (
        <div>
          <input type="date" value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
          <button onClick={handleData}>set data</button>
        </div>
      )}
    </>
  );
}

export default MyBirthday;
