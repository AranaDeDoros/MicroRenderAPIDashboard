import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AppPreferences {
    isDarkMode: boolean
    userName: string
    servicesOpen: boolean
    postgresOpen: boolean
    setServicesOpen: (value: boolean) => void
    setPostgresOpen: (value: boolean) => void
}
export const useUI = create<AppPreferences>()(
    persist(
        (set) => ({
            isDarkMode: false,
            userName: import.meta.env.VITE_USERNAME,
            servicesOpen: false,
            postgresOpen: false,

            setServicesOpen: (value) =>
                set({ servicesOpen: value }),

            setPostgresOpen: (value) =>
                set({ postgresOpen: value }),
        }),
        {
            name: "app-preferences",
        }
    )
)