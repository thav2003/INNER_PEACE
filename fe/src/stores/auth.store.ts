import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthControllerApi, LoginRequest, SignUpRequest } from "~/api/v1";

import { AuthStatus, RegisterUser, User } from "~/interfaces";

export interface AuthState {
  status: AuthStatus;
  accessToken?: string;
  user?: User;

  loginUser: (data: LoginRequest) => Promise<void>;
  logoutUser: () => void;
  registerUser: (data: SignUpRequest) => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "unauthorized",
  accessToken: undefined,
  user: undefined,
  loginUser: async (data) => {
    console.log(data);
    const authControllerApi = new AuthControllerApi();
    const res = await authControllerApi.signin({
      loginRequest: data,
    });
    console.log(res);
    // const data = res.data.data!;
    // set({
    //   status: "authorized",
    //   token: data.accessToken!,
    //   user: {
    //     id: data.id!,
    //     name: data.name!,
    //     username: data.username!,
    //     role: data.role!,
    //   },
    // });
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
  devtools(persist(storeApi, { name: "auth-storage" }))
);
