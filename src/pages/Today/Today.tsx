import { useContext } from 'react';
import { DataContext } from '../../providers/DataProvider';
import BirthdayCard from '../../components/friend/BirthdayCard';

function Today() {
  const { userData } = useContext(DataContext);

  const newData = userData.friends.filter((friend) => {
    const birthday = new Date(friend.date);
    const today = new Date();

    birthday.setHours(0);
    birthday.setFullYear(today.getFullYear());

    if (birthday < today) birthday.setFullYear(today.getFullYear() + 1);
    if (today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth()) return true;
    return false;
  });
  return (
    <div className="flex flex-col gap-4">
      {newData.length ? (
        newData.map((friend) => <BirthdayCard key={friend.id} friend={friend} />)
      ) : (
        <div>There are no birthdays today. But that's no reason not to have a party!🔥</div>
      )}
    </div>
  );
}

export default Today;
