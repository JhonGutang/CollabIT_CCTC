
export interface Post {
  id: number;
  userId: number;
  username: string;
  avatarLink: string;
  content: string;
  imageLink: string;
  videoLink: string;
  reactionCount: number;
  commentsCount: number;
  reactionId: number;
}

export interface NewPost {
  userId: number;
  image?: File;
  content: string;
}

export interface RawPost {
  id: number;
  user_id: number;
  username: string;
  avatar_link?: string;
  content: string;
  image_link?: string;
  video_link?: string;
  reactions_count: number;
  comments_count: number;
  reaction_id: number;
}