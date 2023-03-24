import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  createContext,
} from "react";
import events from "events";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ApplicationContext = createContext();

export const ApplicationProvider = (props) => {
  const [user, setUser] = useState();
  const [payment, setPayment] = useState();
  const evts = useRef(new events.EventEmitter()).current;

  const getUserInfo = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      const valueObject = JSON.parse(value);
      setUser(valueObject);
      return valueObject;
    } catch (e) {
      return undefined;
    }
  }, []);

  const getPaymentInfo = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem("payment");
      const valueObject = JSON.parse(value);
      setPayment(valueObject);
      return valueObject;
    } catch (e) {
      return undefined;
    }
  }, []);

  const updateUser = async (data) => {
    await AsyncStorage.setItem("user", JSON.stringify(data));
    getUserInfo();
  };

  //payment
  const updatePaymet = async(data) => {
    await AsyncStorage.setItem("payment", JSON.stringify(data));
    getPaymentInfo();
  }

  useEffect(() => {
    const handler = async () => {
      getUserInfo();
    };
    handler().then();
  }, [getUserInfo]);

  //payment
  useEffect(() => {
    const handler = async() => {
      getPaymentInfo();
    };
    handler().then();
  }, [getPaymentInfo]);

  const setNewUser = useMemo(
    () => ({
      updateUser,
    }),
    [updateUser]
  );

  //payment
  const setNewPayment = useMemo(
    () => ({
      updatePaymet,
    }),
    [updatePaymet]
  );

  return (
    <ApplicationContext.Provider
      value={{
        user,
        setNewUser,
        events: evts,
        payment,
        setNewPayment,
      }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContext;
