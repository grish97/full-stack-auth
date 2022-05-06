import apiRoutes from "configs/apiRoutes";
import { axios } from "services";
import useAuth from "./useAuth";

export function useRefreshToken() {
  const { setAuth } = useAuth();

  function refresh() {
    const response = axios.post(apiRoutes.APP_REFRESH.url, {
      withCredentials: true,
    });

    console.log(response);
  }

  return { refresh };
}
