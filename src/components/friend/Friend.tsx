import { useMemo, useState } from 'react';
import { Friend } from '../../interfaces/userdata';

interface FriendCardProps {
  friend: Friend;
  changeFriend: (friend: Friend) => void;
  deleteFriend: (friend: Friend) => void;
}

function FriendCard({ friend, changeFriend, deleteFriend }: FriendCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGift, setNewGift] = useState('');

  const handleAddGift = () => {
    if (newGift.trim() !== '') {
      changeFriend({ ...friend, gifts: friend.gifts ? [...friend.gifts, newGift] : [newGift] });
      setNewGift('');
    }
  };

  const day = useMemo(() => {
    const birthday = new Date(friend.date);
    const today = new Date();

    birthday.setFullYear(today.getFullYear());

    if (today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth()) return 0;
    if (birthday < today) birthday.setFullYear(today.getFullYear() + 1);

    const timeDifference = birthday.getTime() - today.getTime();
    const seconds = Math.max(Math.floor(timeDifference / 1000), 0);
    return Math.floor(seconds / (3600 * 24)) + 1;
  }, [friend]);

  return (
    <div className="flex gap-2 rounded-xl w-full bg-gray-100 p-4 items-center">
      <div className="rounded-full w-12 h-12 overflow-hidden flex items-center justify-center">
        <img src={`./avatars/avatar-${(friend.id % 5) + 1}.jpeg`} alt="" />
      </div>
      <div className="">
        <div className="text-xl font-bold">{friend.name}</div>
        <div className="text-sm opacity-60">
          {day || "Don't forget to congratulate!"}
          {!day ? '' : ' day' + (day % 10 === 1 ? '' : 's')}
        </div>
      </div>
      <div className="ml-auto flex gap-2">
        <div className="rounded-xl leading-none bg-orange-200 py-3 px-3 grid place-items-center h-fit">
          <button onClick={() => setIsModalOpen(true)}>🎁</button>
        </div>
        <div className="rounded-xl leading-none bg-red-200 py-3 px-3 grid place-items-center h-fit">
          <button onClick={() => deleteFriend(friend)}>❌</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-30 flex items-center justify-center z-10 px-4">
          <div className="bg-white p-4 rounded-lg relative flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">Gift Ideas</h2>
            <ul className="list-disc list-inside">
              {friend.gifts?.length ? (
                friend.gifts.map((gift, id) => <li key={id}>{gift}</li>)
              ) : (
                <div className="text-center">No ideas</div>
              )}
            </ul>
            <div className="flex gap-4">
              <input
                className="w-full block rounded-xl outline-none bg-slate-100 px-3 py-2"
                type="text"
                value={newGift}
                onChange={(e) => setNewGift(e.target.value)}
              />
              <button
                className="rounded-xl leading-none bg-indigo-100 py-3 px-3 grid place-items-center h-fit"
                onClick={handleAddGift}
              >
                add
              </button>
            </div>
            <button className="absolute top-1 right-2 text-red-400 text-2xl rotate-45" onClick={() => setIsModalOpen(false)}>
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FriendCard;
