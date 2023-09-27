export interface UserData {
  date: string;
  friends: Friend[];
}

export interface Friend {
  name: string;
  date: string;
  gifts?: string[];
}
