import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  AuthControllerApi,
  AuthResponse,
  LoginRequest,
  SignUpRequest,
} from "~/api/v1";

import { AuthStatus, RegisterUser, User } from "~/interfaces";

export interface AuthState {
  status: AuthStatus;
  accessToken?: string;
  user?: AuthResponse;

  loginUser: (data: LoginRequest) => Promise<void>;
  logoutUser: () => void;
  registerUser: (data: SignUpRequest) => Promise<void>;
}
const authControllerApi = new AuthControllerApi();
const storeApi: StateCreator<AuthState> = (set) => ({
  status: "unauthorized",
  accessToken: undefined,
  user: undefined,
  loginUser: async (data) => {
    console.log(data);

    const res = await authControllerApi.signin({
      loginRequest: data,
    });

    // const data = res.data.data!;
    set({
      status: "authorized",
      accessToken: res.accessToken,
      user: res,
    });
  },
  logoutUser: () => {
    set({ status: "unauthorized", accessToken: undefined, user: undefined });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerUser: async (data) => {
    await authControllerApi.signup({ signUpRequest: data });
  },
});

export const useAuthStore = create<AuthState>()(
  persist(storeApi, {
    name: "auth-storage",
    storage: createJSONStorage(() => AsyncStorage),
  })
);
