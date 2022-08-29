import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/Header";
import { createContext, useEffect, useState } from "react";
import { IGlobal, IUserData } from "../interface/user.interface";
import { useCookies } from "react-cookie";
import axios, { AxiosError, AxiosResponse } from "axios";

export const Global = createContext<IGlobal>({});

function MyApp({ Component, pageProps }: AppProps) {
  const [userToken, setUserToken] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>({});
  const [cookies, , removeCookie] = useCookies();

  const globalState = {
    userToken,
    setUserToken,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
  };

  useEffect(() => {
    if (userToken === "") return;
    (async () => {
      try {
        const response: AxiosResponse = await axios.post(
          "http://localhost:4001/api/user/sendToken",
          {
            userToken,
          }
        );
        const result = response.data;
        setIsLogin(true);
        setUserData(result);
      } catch (err) {
        const error = err as AxiosError<any>;
        console.log(error);
        setIsLogin(false);
        removeCookie("CHANNEL_Token");
        setUserToken("");
      }
    })();
  }, [userToken]);

  useEffect(() => {
    const { CHANNEL_Token: token } = cookies;
    if (token) {
      setUserToken(token);
    }
  }, []);

  return (
    <Global.Provider value={globalState}>
      <ChakraProvider>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </Global.Provider>
  );
}

export default MyApp;
