import { TApiRoutes } from "@configs";

export default {
  APP_AUTH_LOGIN: {
    method: "POST",
    url: "auth/login",
  },
  APP_REFRESH: {
    method: "POST",
    url: "auth/refresh",
  },
} as TApiRoutes;
