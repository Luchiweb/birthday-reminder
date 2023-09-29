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
    <div>
      {userData.date ? (
        <div>
          <Timer date={userData.date}></Timer>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <input className="form-input" type="date" value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
          <button className="primary-button" onClick={handleData}>
            set your birthday
          </button>
        </div>
      )}
    </div>
  );
}

export default MyBirthday;
