declare module "@store" {
  type TAuthState = {
    id: string;
    username: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    isLogged: boolean;
  };
}
