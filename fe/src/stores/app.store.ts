import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
export interface AppState {
  isRefecth: boolean;
  refetchApp: () => void;
  reload: () => void;
}

const storeApi: StateCreator<AppState> = (set) => ({
  isRefecth: false,

  refetchApp: () => {
    set((state) => ({ isRefecth: !state.isRefecth }));
  },
  reload: () => {
    set((state) => ({ isRefecth: !state.isRefecth }));
    AsyncStorage.clear();
  },
});

export const useAppStore = create<AppState>()(
  persist(storeApi, {
    name: "app-storage",
    storage: createJSONStorage(() => AsyncStorage),
  })
);
