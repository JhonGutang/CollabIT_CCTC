import axiosInstance from "@/utils/axiosInstance";
import { getUserDataFromLocal } from "./userService";

export const fetchAvatars = async() => {
    const token = getUserDataFromLocal()?.authToken
    const response = await axiosInstance.get('avatars/', {
        headers: {
            Authorization: `Token ${token}`
        }
    })

    return response.data;
}


export const attachAvatarToUser = async(avatarId: number) => {
    const token = getUserDataFromLocal()?.authToken
    const response = await axiosInstance.patch('/profiles/update/', {
      avatar: avatarId
    }, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
  }