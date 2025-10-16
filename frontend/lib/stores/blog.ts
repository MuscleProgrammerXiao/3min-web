import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { BlogPost } from "@/lib/types/blog";
import { mockPosts } from "@/lib/mock/blog";

// SSR 安全的存储（与 useGlobalStore 保持一致的策略）
const noopStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  key: () => null,
  length: 0,
};
const safeStorage = typeof window !== "undefined" ? localStorage : noopStorage;

interface BlogState {
  posts: BlogPost[];
  getPostById: (id: number) => BlogPost | undefined;
  createPost: (post: Omit<BlogPost, "id">) => BlogPost;
  updatePost: (id: number, patch: Partial<BlogPost>) => BlogPost | undefined;
  deletePost: (id: number) => void;
}

export const useBlogStore = create<BlogState>()(
  persist(
    (set, get) => ({
      posts: mockPosts,

      getPostById: (id: number) => {
        const { posts } = get();
        return posts.find(p => p.id === id);
      },

      createPost: (postInput: Omit<BlogPost, "id">) => {
        const { posts } = get();
        const nextId = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
        const newPost: BlogPost = { id: nextId, ...postInput };
        set({ posts: [newPost, ...posts] });
        return newPost;
      },

      updatePost: (id: number, patch: Partial<BlogPost>) => {
        const { posts } = get();
        const idx = posts.findIndex(p => p.id === id);
        if (idx === -1) return undefined;
        const updated: BlogPost = { ...posts[idx], ...patch };
        const next = [...posts];
        next[idx] = updated;
        set({ posts: next });
        return updated;
      },

      deletePost: (id: number) => {
        const { posts } = get();
        set({ posts: posts.filter(p => p.id !== id) });
      },
    }),
    {
      name: "blog-storage",
      storage: createJSONStorage(() => safeStorage),
      partialize: state => ({ posts: state.posts }),
    }
  )
);