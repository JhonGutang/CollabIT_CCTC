import axiosInstance from "@/utils/axiosInstance";

export interface User {
  username: string;
  password: string;
  email: string;
}

export interface isUserAuthenticated {
  username: string,
  password: string,
  token: string,
}

export const createUser = async (userData: Partial<User>): Promise<User> => {
    const response = await axiosInstance.post<User>("/profiles/register/", userData);
    console.log('Form submitted:', userData);
  return response.data;
};

export const loginUser = async (userData: Partial<isUserAuthenticated>): Promise<isUserAuthenticated> => {
  const response = await axiosInstance.post<isUserAuthenticated>('/profiles/login/', userData);
  localStorage.setItem('authToken', response.data.token )
  return response.data; 
}
