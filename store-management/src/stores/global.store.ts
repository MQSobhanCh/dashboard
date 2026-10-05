import { create } from "zustand";
import type { Theme } from "../types/general";

type GlobalStore = {
  theme: Theme;
  toggleTheme: () => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => {
    const nextTheme: Theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    return { theme: nextTheme };
  })
}));
