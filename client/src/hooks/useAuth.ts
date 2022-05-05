import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";

import { TAuthState } from "@store";

export default function useAuth() {
    const authStore = useSelector<RootState, TAuthState>((store) => store.auth);

    return authStore;
}