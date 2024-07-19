declare module "@env" {
  export const SERVER_URL: string;
  export const VIETQR_URL: string;
}
declare module "*.svg";
declare module "uuid";

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_API_URL: string;
    EXPO_PUBLIC_SOCKER_URL: string;
    EXPO_PUBLIC_VIETQR_URL: string;
  }
}
