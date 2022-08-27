import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/Header";
import { createContext, useState } from "react";
import { IGlobal, IUserData } from "../interface/user.interface";
import { useCookies } from "react-cookie";

export const Global = createContext<IGlobal>({});

function MyApp({ Component, pageProps }: AppProps) {
  const [userToken, setUserToken] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>({});
  const [cookies, removeCookie] = useCookies();

  const globalState = {
    userToken,
    setUserToken,
    isLogin,
    setIsLogin,
    userData,
  };

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
