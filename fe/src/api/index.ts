import { AxiosError } from "axios";
import {
  AuthControllerApi,
  LessonControllerApi,
  ProfileControllerApi,
  UserControllerApi,
  StringResponse,
  DailyMealPlanControllerApi,
} from "./v1";
import {
  Configuration,
  DefaultApi,
  IngredientsApi,
  MealPlanningApi,
  MenuItemsApi,
  MiscApi,
  ProductsApi,
  RecipesApi,
  WineApi,
} from "./spoonacular";
import { BaseAPI as SpoonacularBaseApi } from "./spoonacular/base";
import { BaseAPI } from "./v1/base";

const config = new Configuration({
  apiKey: "41d674c631484920b703c241432c8c61",
});

const profileApi = new ProfileControllerApi();
const authApi = new AuthControllerApi();
const userApi = new UserControllerApi();
const lessonControllerApi = new LessonControllerApi();
const dailyMealPlanControllerApi = new DailyMealPlanControllerApi();

const defaultApi = new DefaultApi(config);
const ingredientsApi = new IngredientsApi(config);
const mealPlanningApi = new MealPlanningApi(config);
const menuItemsApi = new MenuItemsApi(config);
const miscApi = new MiscApi(config);
const productsApi = new ProductsApi(config);
const recipesApi = new RecipesApi(config);
const wineApi = new WineApi(config);

type ProfileApiType = typeof profileApi;
type AuthApiType = typeof authApi;
type UserApiType = typeof userApi;
type LessonApiType = typeof lessonControllerApi;
type DailyMealPlanApi = typeof dailyMealPlanControllerApi;

type DefaultApiType = typeof defaultApi;
type IngredientsApiType = typeof ingredientsApi;
type MealPlanningApiType = typeof mealPlanningApi;
type MenuItemsApiType = typeof menuItemsApi;
type MiscApiType = typeof miscApi;
type ProductsApiType = typeof productsApi;
type RecipesApiType = typeof recipesApi;
type WineApiType = typeof wineApi;

type ApiType = AuthApiType &
  UserApiType &
  ProfileApiType &
  LessonApiType &
  DailyMealPlanApi;

type SpoonacularApiType = DefaultApiType &
  IngredientsApiType &
  MealPlanningApiType &
  MenuItemsApiType &
  MiscApiType &
  ProductsApiType &
  RecipesApiType &
  WineApiType;

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
const mergeSpoonacularApis = (
  ...apis: SpoonacularBaseApi[]
): SpoonacularApiType => {
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
  dailyMealPlanControllerApi
);
export const spoonacularApi: SpoonacularApiType = mergeSpoonacularApis(
  defaultApi,
  ingredientsApi,
  mealPlanningApi,
  menuItemsApi,
  miscApi,
  productsApi,
  recipesApi,
  wineApi
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
