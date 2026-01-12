import { create } from 'zustand'

export const useFavoritesStore = create((set, get) => ({
    //estado inicial
    favorites: [],

    //acciones
    addFavorite: (jobId) => {
        set((state) => ({ 
            favorites: state.favorites.includes(jobId) ? state.favorites : [...state.favorites, { id: jobId }]
            /*
            state = esta propiedad representa el estado actual . Al usar state.favorites, estamos accediendo al arreglo actual de favoritos almacenado.
            */
        }))
    },

    removeFavorite: (jobId) => {
        set((state) => ({ 
            favorites: state.favorites.filter(fav => fav.id !== jobId) 
        }))
    },

    isFavorite: (jobId) => {
        const { favorites } = get()
        return favorites.some(fav => fav.id === jobId)
    },

    clearFavorites: () => set({ favorites: [] }),

    toggleFavorite: (jobId) => {
        const { isFavorite, addFavorite, removeFavorite } = get()
        isFavorite(jobId) ? removeFavorite(jobId) : addFavorite(jobId)
    },

    countFavorites: () => get().favorites.length
}))
