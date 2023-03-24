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

  const updateUser = async (data) => {
    await AsyncStorage.setItem("user", JSON.stringify(data));
    getUserInfo();
  };

  useEffect(() => {
    const handler = async () => {
      getUserInfo();
    };
    handler().then();
  }, [getUserInfo]);

  const setNewUser = useMemo(
    () => ({
      updateUser,
    }),
    [updateUser]
  );

  return (
    <ApplicationContext.Provider
      value={{
        user,
        setNewUser,
        events: evts,
      }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContext;
