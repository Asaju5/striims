import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("striims-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("striims-theme", theme);
    set({ theme });
  },
}));
