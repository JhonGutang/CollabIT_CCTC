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

export interface LocalUserData {
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

export const loginUser = async (credentials: LoginCredentials)  => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/profiles/login/', credentials);
    storeUserDataToLocal(response.data);
    return {
      open: true, message: "Logged in successfully!", state: "success"
    }
  } catch (error) {
    return {
      open: true, message: "Logged in failed!", state: "error"
    }
  }
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

  const transformedData = response.data.map(user => ({
    ...user,
    avatarLink: `http://127.0.0.1:8000/media/${user.avatar_link}`,
    avatar_link: undefined // Remove the original avatar_link property
  }));

  console.log(transformedData);
  return transformedData;
};

export const addToFriends = async (userId: number) => {
  const token = getUserDataFromLocal()?.authToken
  const response = await axiosInstance.post('/profiles/friend/', {
    friend_id: userId
  }, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
  console.log(response.data);
  
}

export interface FriendsResponse {
  friends: number[];
}

export const getAllFriendsID = async (): Promise<number[]> => {
  const token = getUserDataFromLocal()?.authToken;
  const response = await axiosInstance.get<{ friends: number[] }[]>('/profiles/friend/', {
    headers: {
      Authorization: `Token ${token}`
    }
  });

  return response.data.flatMap(obj => obj.friends);
};

