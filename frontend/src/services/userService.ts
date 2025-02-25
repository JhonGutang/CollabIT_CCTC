import axiosInstance from "@/utils/axiosInstance";

export interface UserCandidate {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  yearLevel: number;
  email: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  token: string;
  avatar_link: string | null;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  yearLevel: number;
  email: string;
  avatarLink: string | null;
}

interface LocalUserData {
  id: number;
  username: string;
  avatarLink: string | null;
  authToken: string;
}


const storeUserDataToLocal = (data: AuthResponse): void => {
  const localData: LocalUserData = {
    id: data.id,
    username: data.username,
    avatarLink: data.avatar_link ? `http://127.0.0.1:8000${data.avatar_link}` : null,
    authToken: data.token
  };
  localStorage.setItem('userData', JSON.stringify(localData));
};

export const updateAvatarLinkInLocal = (newAvatarLink: string | null): void => {
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    const userData: LocalUserData = JSON.parse(storedData);
    userData.avatarLink = newAvatarLink ? `http://127.0.0.1:8000/media/${newAvatarLink}` : null;
    localStorage.setItem('userData', JSON.stringify(userData));
  }
};

export const getUserDataFromLocal = (): LocalUserData | null => {
  const storedData = localStorage.getItem('userData');
  return storedData ? JSON.parse(storedData) : null;
};

export const createUser = async (userData: Partial<UserCandidate>): Promise<UserCandidate> => {
  const dataToSubmit = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    first_name: userData.firstName,
    last_name: userData.lastName, 
    year_level: userData.yearLevel
  };
  
  const response = await axiosInstance.post<UserCandidate>("/profiles/register/", dataToSubmit);
  return response.data;
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/profiles/login/', credentials);
  storeUserDataToLocal(response.data);
  return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const userData = getUserDataFromLocal();
  if (!userData?.authToken) {
    throw new Error('No authentication token found');
  }

  const response = await axiosInstance.get<User[]>('/profiles/', {
    headers: {
      Authorization: `Token ${userData.authToken}`
    }
  });
  return response.data;
};