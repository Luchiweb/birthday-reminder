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
        <div>
          <input
            className="rounded-xl outline-none bg-slate-100 px-3 py-2"
            type="date"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <button
            className="inline-flex items-center justify-center px-4 py-2 text-base leading-5 rounded-full border font-medium transition ease-in-out duration-150 focus:outline-none bg-blue-100 border-blue-100 hover:bg-blue-200 hover:border-blue-200"
            onClick={handleData}
          >
            set data
          </button>
        </div>
      )}
    </div>
  );
}

export default MyBirthday;
