interface User {
  id: number;
  name: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    return data as User[];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};