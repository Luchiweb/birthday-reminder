export interface UserData {
  date: string;
  friends: Friend[];
}

export interface Friend {
  id: number;
  name: string;
  date: string;
  gifts?: string[];
}

export type FriendData = Omit<Friend, 'id'>;
