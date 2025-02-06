import axiosInstance from "@/utils/axiosInstance";

export interface User {
  username: string;
  password: string;
  email: string;
}

export const createUser = async (userData: Partial<User>): Promise<User> => {
    const response = await axiosInstance.post<User>("/profiles/", userData);
    console.log('Form submitted:', userData);
  return response.data;
};
