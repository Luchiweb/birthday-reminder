import { useContext, useState } from 'react';
import { DataContext } from '../../providers/DataProvider';
import FriendCard from './Friend';
import NewFriendForm from './NewFriendForm';
import { Friend } from '../../interfaces/userdata';

function Friends() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { userData, setUserData } = useContext(DataContext);

  const handleData = (friend: Friend) => {
    setUserData((prev) => ({ ...prev, friends: [...prev.friends, friend] }));
  };
  return (
    <div className="grid place-items-center gap-4">
      {showForm && <NewFriendForm callback={handleData} />}
      {userData.friends.length ? (
        userData.friends.map((friend, id) => <FriendCard key={id} friend={friend} />)
      ) : (
        <div>Your list is empty, but let's change it!</div>
      )}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center px-4 py-2 text-base leading-5 rounded-full border font-medium transition ease-in-out duration-150 focus:outline-none bg-indigo-100 border-indigo-100 hover:bg-indigo-200 hover:border-indigo-200"
        >
          add new friend
        </button>
      )}
    </div>
  );
}

export default Friends;
