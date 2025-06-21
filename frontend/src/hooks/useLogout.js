import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //remove user from LocalStorage
    localStorage.removeItem("user");

    //dispatch logout action(update the global state)
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
