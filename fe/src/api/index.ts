import { AxiosError } from "axios";
import {
  AuthControllerApi,
  LessonControllerApi,
  RecipeControllerApi,
  ProfileControllerApi,
  UserControllerApi,
  StringResponse,
} from "./v1";
import { BaseAPI } from "./v1/base";
// import globalAxios from "axios";
// export const responseInterceptor = (response: any) => {
//   /**
//    * Add logic for successful response
//    */
//   return response?.data || {};
// };
// export const responseErrorInterceptor = async (error: any) => {
//   return Promise.reject(error);
// };

// globalAxios.interceptors.response.use(
//   responseInterceptor,
//   responseErrorInterceptor
// );

const profileApi = new ProfileControllerApi();
const authApi = new AuthControllerApi();
const userApi = new UserControllerApi();
const lessonControllerApi = new LessonControllerApi();
const recipeControllerApi = new RecipeControllerApi();

type ProfileApiType = typeof profileApi;
type AuthApiType = typeof authApi;
type UserApiType = typeof userApi;
type LessonApiType = typeof lessonControllerApi;
type RecipeApiType = typeof recipeControllerApi;

type ApiType = AuthApiType &
  UserApiType &
  ProfileApiType &
  LessonApiType &
  RecipeApiType;

const mergeApis = (...apis: BaseAPI[]): ApiType => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mergedApi: any = {};
  apis.forEach((api) => {
    const proto = Object.getPrototypeOf(api);
    const keys = Object.getOwnPropertyNames(proto);

    keys.forEach((key) => {
      // Kiểm tra xem thuộc tính có phải là một phương thức không
      if (key !== "constructor") {
        const descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor && typeof descriptor.value === "function") {
          mergedApi[key] = descriptor.value.bind(api);
        } else if (!mergedApi[key]) {
          mergedApi[key] = api[key];
        }
      }
    });
  });
  return mergedApi;
};
const api: ApiType = mergeApis(
  authApi,
  userApi,
  profileApi,
  lessonControllerApi,
  recipeControllerApi
);
export const formatError = (err: any) => {
  const error = err as AxiosError<StringResponse>;

  if (error.response?.data.message) {
    return error.response?.data?.message;
  } else if (error.message) {
    return error.message;
  }
  return "Có lỗi xảy ra";
};
export default api;
