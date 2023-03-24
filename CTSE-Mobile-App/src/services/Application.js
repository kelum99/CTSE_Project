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


//Payment

export const usePaymentInfo = () => {
  const context = useContext(ApplicationContext);
  return context.payment;
};

export const updatePaymet = () => {
  const context = useContext(ApplicationContext);
  return context.setNewPayment;
};