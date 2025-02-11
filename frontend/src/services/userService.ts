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
  token: string;
  authToken: string;
}

export interface UserData {
  id: number;
  username: string;
  token: string;
  authToken: string;
}

const userData = {
  id: 0,
  username: '',
  authToken: ''
}

const storeUserDataToLocal = (data: UserData ) => {
  userData.id = data.id;
  userData.username = data.username;
  userData.authToken = data.token;
  localStorage.setItem('userData', JSON.stringify(userData));
}

export const getUserDataFromLocal = (): UserData | null => {
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