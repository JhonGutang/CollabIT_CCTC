import axiosInstance from "@/utils/axiosInstance";

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}
export interface isUserAuthenticated {
  id: number;
  username: string;
  password: string;
  avatarLink?: string;
  token: string;
  authToken: string;
}

const userData = {
  id: 0,
  username: '',
  avatarLink: null as string | null, 
  authToken: ''
}

const storeUserDataToLocal = (data: any) => {
  userData.id = data.id;
  userData.username = data.username;
  userData.avatarLink = data.avatar_link ? `http://127.0.0.1:8000${data.avatar_link}` : null,
  userData.authToken = data.token;
  localStorage.setItem('userData', JSON.stringify(userData));
}

export const getUserDataFromLocal = (): isUserAuthenticated | null => {
  const storedData = localStorage.getItem('userData');
  return storedData ? JSON.parse(storedData) : null;
}

export const createUser = async (userData: Partial<User>): Promise<User> => {
    const response = await axiosInstance.post<User>("/profiles/register/", userData);
    console.log('Form submitted:', userData);
    return response.data;
};

export const loginUser = async (userData: Partial<isUserAuthenticated>): Promise<isUserAuthenticated> => {
  const response = await axiosInstance.post<isUserAuthenticated>('/profiles/login/', userData);
  storeUserDataToLocal(response.data);
  return response.data; 
}

export const getAllUsers = async (): Promise<User[]> => {
  const token = getUserDataFromLocal()?.authToken;
  const response = await axiosInstance.get<User[]>('/profiles/', {
    headers: {
      Authorization: `Token ${token}`
    }
  });
  return response.data;
}