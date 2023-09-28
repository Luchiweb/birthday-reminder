import { useContext, useState } from 'react';
import { DataContext } from '../../providers/DataProvider';
import FriendCard from '../../components/friend/Friend';
import NewFriendForm from './NewFriendForm';
import { Friend, FriendData } from '../../interfaces/userdata';

function Friends() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { userData, setUserData } = useContext(DataContext);

  const addFriend = (friend: FriendData) => {
    setUserData((prev) => {
      const id = prev.friends.length ? prev.friends[prev.friends.length - 1].id + 1 : 1;
      return { ...prev, friends: [...prev.friends, { ...friend, id }] };
    });
  };

  const changeFriend = (friend: Friend) => {
    setUserData((prev) => {
      const updatedFriends = prev.friends.map((item) => (item.id === friend.id ? friend : item));
      return { ...prev, friends: updatedFriends };
    });
  };

  const deleteFriend = (friend: Friend) => {
    setUserData((prev) => {
      const updatedFriends = prev.friends.filter((item) => item.id !== friend.id);
      return { ...prev, friends: updatedFriends };
    });
  };

  return (
    <div className="grid place-items-center gap-4">
      {showForm && <NewFriendForm setData={addFriend} closeForm={setShowForm} />}
      {userData.friends.length ? (
        userData.friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} changeFriend={changeFriend} deleteFriend={deleteFriend} />
        ))
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
