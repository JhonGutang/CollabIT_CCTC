export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
    id: number;
    username: string;
    token: string;
    avatar_link: string | null;
  }


export interface UserCandidate {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    yearLevel: number;
    email: string;
  }


  export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    yearLevel: number;
    email: string;
    avatarLink: string;
    avatar_link?: string;
  }


  export interface LocalUserData {
    id: number;
    username: string;
    avatarLink: string | null;
    authToken: string;
  }