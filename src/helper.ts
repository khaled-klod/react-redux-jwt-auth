import { useSelector } from "react-redux";
import { StoreState } from "./store/store";

export const useIsAuthenticated = () => {
  const meUser = useSelector((state: StoreState) => state.meUser);
  return meUser;
};


