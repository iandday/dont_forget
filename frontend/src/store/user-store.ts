import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
//https://medium.com/@kirankumal714/implementing-refresh-token-in-react-using-axios-zustand-and-react-query-a5dbac2944b6
//Cleanup authcontext and check if this persists
interface User {
  accessToken: string
  refreshToken: string
  firstName: string
  lastName: string
  email: string
}

interface UserState {
  user: User | null
  setCredentials: (user: User) => void
  removeCredentials: () => void
}

const userStoreSlice: StateCreator<UserState> = (set) => ({
  user: null,
  setCredentials: (user) => set({ user }),
  removeCredentials: () => set({ user: null }),
})

const persistedUserStore = persist<UserState>(userStoreSlice, {
  name: 'user',
})

export const useUserStore = create(persistedUserStore)
