import { useMemo } from 'react';
import { Friend } from '../../interfaces/userdata';

function BirthdayCard({ friend }: { friend: Friend }) {
  const age = useMemo(() => {
    const birthday = new Date(friend.date);
    const today = new Date();
    return today.getFullYear() - birthday.getFullYear();
  }, [friend]);

  return (
    <div className="flex flex-col w-full gap-1 rounded-xl bg-gray-100 p-4 items-center">
      <div className="rounded-full w-12 h-12 overflow-hidden flex items-center justify-center">
        <img className="object-cover" src={`./avatars/avatar-${(friend.id % 5) + 1}.jpg`} alt="avatar" />
      </div>
      <div className="text-xl font-bold">{friend.name}</div>
      <div className="text-sm opacity-80">
        {age} {age > 1 ? 'years' : 'year'}
      </div>
    </div>
  );
}

export default BirthdayCard;
