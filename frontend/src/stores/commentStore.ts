import { create } from 'zustand'

interface CommentCountStore {
    commentCount: number,
    updateCommentCount: () => void,
    setCommentCount: (value: number) => void 
}

const useCommentCountStore = create<CommentCountStore>((set) => ({
    commentCount: 0,
    updateCommentCount: () => set((state) => ({ commentCount: state.commentCount + 1 })),
    setCommentCount: (value) => set({ commentCount: value }),
}));

export default useCommentCountStore