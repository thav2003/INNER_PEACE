import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import api from "~/api";
import {
  AuthResponse,
  LoginRequest,
  SignUpRequest,
  UserResponse,
} from "~/api/v1";

import { AuthStatus, RegisterUser, User } from "~/interfaces";

export interface AuthState {
  status: AuthStatus;
  accessToken?: string;
  auth?: AuthResponse;
  profile?: UserResponse;
  loginUser: (data: LoginRequest) => Promise<void>;
  logoutUser: () => void;
  registerUser: (data: SignUpRequest) => Promise<void>;
  getProfile: () => Promise<void>;
}
const storeApi: StateCreator<AuthState> = (set, get) => ({
  status: "unauthorized",
  accessToken: undefined,
  auth: undefined,
  profile: undefined,
  loginUser: async (data) => {
    const res = (await api.signin(data)) as any;

    set({
      status: "authorized",
      accessToken: res.data?.data?.accessToken,
      auth: res.data?.data,
      profile: undefined,
    });
  },
  logoutUser: () => {
    set({
      status: "unauthorized",
      accessToken: undefined,
      auth: undefined,
      profile: undefined,
    });
  },
  registerUser: async (data) => {
    await api.signup(data);
  },
  getProfile: async () => {
    const { accessToken } = get();
    console.log(get());
    const res = await api.getProfile({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    set((state) => ({
      ...state,
      profile: res.data,
    }));
  },
});

export const useAuthStore = create<AuthState>()(
  persist(storeApi, {
    name: "auth-storage",
    storage: createJSONStorage(() => AsyncStorage),
  })
);
