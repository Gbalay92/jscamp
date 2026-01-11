//this is an example of a zustand store for authentication.. it will not be used in this project
import { create } from "zustand"

export const useAuthStore = create((set) => ({
    isLoggedIn: false,
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
}))
