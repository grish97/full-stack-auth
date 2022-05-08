import { TApiRoutes } from "@configs";

export default {
  APP_AUTH_LOGIN: {
    method: "POST",
    url: "auth/login",
  },
  APP_REFRESH: {
    method: "GET",
    url: "auth/refresh",
  },
  APP_LOGOUT: {
    method: "GET",
    url: "auth/logout",
  },
} as TApiRoutes;
