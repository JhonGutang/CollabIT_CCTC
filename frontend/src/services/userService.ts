import axiosInstance from "@/utils/axiosInstance";
import {
  LoginCredentials,
  LoginResponse,
  UserCandidate,
  LocalUserData,
  User,
} from "@/types/user";


const BASE_URL = "http://127.0.0.1:8000";
const AVATAR_BASE_PATH = "/media/";


const transformAvatarLink = (link?: string | null): string | null => 
  link ? `${BASE_URL}${AVATAR_BASE_PATH}${link}` : null;


const getAuthHeaders = (): { Authorization: string } | undefined => {
  const token = getUserDataFromLocal()?.authToken;
  return token ? { Authorization: `Token ${token}` } : undefined;
};


export const getUserDataFromLocal = (): LocalUserData | null => {
  const storedData = localStorage.getItem("userData");
  return storedData ? JSON.parse(storedData) : null;
};

const storeUserDataToLocal = (data: LoginResponse): void => {
  const localData: LocalUserData = {
    id: data.id,
    username: data.username,
    avatarLink: data.avatar_link ? `http://127.0.0.1:8000${data.avatar_link}` : "",
    authToken: data.token,
  };
  localStorage.setItem("userData", JSON.stringify(localData));
};


export const updateAvatarLinkInLocal = (newAvatarLink: string | null): void => {
  const storedData = getUserDataFromLocal();
  if (storedData) {
    storedData.avatarLink = transformAvatarLink(newAvatarLink);
    localStorage.setItem("userData", JSON.stringify(storedData));
  }
};


const finalizeRegistrationData = (userData: UserCandidate) => ({
  username: userData.username,
  email: userData.email,
  password: userData.password,
  first_name: userData.firstName,
  last_name: userData.lastName,
  year_level: userData.yearLevel,
});


export const register = async (userData: Partial<UserCandidate>): Promise<UserCandidate> => {
  try {
    const response = await axiosInstance.post<UserCandidate>(
      "/profiles/register/",
      finalizeRegistrationData(userData as UserCandidate)
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
};


export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/profiles/login/", credentials);
    storeUserDataToLocal(response.data);
    return { open: true, message: "Logged in successfully!", state: "success" };
  } catch (error) {
    console.error(error);
    return { open: true, message: "Login failed!", state: "error" };
  }
};


export const getAllUsers = async (): Promise<User[]> => {
  const headers = getAuthHeaders();
  if (!headers) throw new Error("No authentication token found");

  try {
    const response = await axiosInstance.get<User[]>("/profiles/", { headers });
    return response.data.map(user => ({
      ...user,
      avatarLink: transformAvatarLink(user.avatar_link) ?? "",
      avatar_link: undefined, 
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users");
  }
};


export const addToFriends = async (userId: number) => {
  const headers = getAuthHeaders();
  if (!headers) throw new Error("No authentication token found");

  await axiosInstance.post("/profiles/friend/", { friend_id: userId }, { headers });
};


export const getAllFriendsID = async (): Promise<number[]> => {
  const headers = getAuthHeaders();
  if (!headers) throw new Error("No authentication token found");

  const response = await axiosInstance.get<{ friends: number[] }[]>("/profiles/friend/", { headers });
  return response.data.flatMap(obj => obj.friends);
};
