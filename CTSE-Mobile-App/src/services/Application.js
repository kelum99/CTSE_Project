import { useContext } from "react";
import ApplicationContext from "./ApplicationContext";

export const useUserInfo = () => {
  const context = useContext(ApplicationContext);
  return context.user;
};

export const updateUser = () => {
  const context = useContext(ApplicationContext);
  return context.setNewUser;
};
export const useEvents = () => {
  return useContext(ApplicationContext).events;
};
