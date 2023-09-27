import { Friend } from '../../interfaces/userdata';

function FriendCard({ friend }: { friend: Friend }) {
  return <div>{friend.name}</div>;
}

export default FriendCard;
