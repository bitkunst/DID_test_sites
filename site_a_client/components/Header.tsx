import { Box, Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Global } from "../pages/_app";
import Router from "next/router";
import { useCookies } from "react-cookie";
import axios, { AxiosError, AxiosResponse } from "axios";

const Header = () => {
  const { isLogin, setIsLogin, setUserToken, userData, setUserData } =
    useContext(Global);
  const [, setCookie, removeCookie] = useCookies();

  const logout = () => {
    removeCookie("CHANNEL_Token");
    if (
      setIsLogin === undefined ||
      setUserToken === undefined ||
      setUserData === undefined
    )
      return;
    setUserToken("");
    setIsLogin(false);
    setUserData({});
    alert("로그아웃 되었습니다.");
    Router.push("/");
  };

  const getPoint = async () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    if (setUserToken === undefined) return;
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:4001/api/user/getPoint",
        {
          userData,
        }
      );
      const { error, updateCheck, token } = response.data;
      if (!error && updateCheck) {
        setUserToken(token);
        setCookie("CHANNEL_Token", token);
      }
    } catch (err) {
      const error = err as AxiosError<any>;
      console.log(error);
      alert(
        "포인트 지급이 정상적으로 처리되지 않았습니다. 잠시후 다시 이용해주세요."
      );
    }
  };

  return (
    <>
      <Box h="100px">
        <Box
          mt="1.5%"
          display="inline-block"
          position="absolute"
          transform="translateX(-50%)"
          left="50%"
        >
          <Heading cursor="pointer" as="h1" size="4xl">
            <Link href="/">CHANNEL</Link>
          </Heading>
        </Box>

        <ButtonGroup gap="2" mr="3%" float="right" mt="3%">
          {!isLogin ? (
            <>
              <LoginModal />
              <Link href="/regist">
                <Button colorScheme="blackAlpha">Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              {/* {userData?.point !== undefined && (
                <span>내 포인트 : {point}</span>
              )} */}
              <span>내 포인트 : </span>
              {userData?.point}
              <Button colorScheme="blackAlpha" onClick={logout}>
                Logout
              </Button>
              <Button colorScheme="red">DID 인증하기</Button>
            </>
          )}
        </ButtonGroup>
      </Box>

      <Flex w="100%" justify="space-evenly" align="center" gap="2" mt="50px">
        <Box cursor="pointer">
          <Link href="/">HOME</Link>
        </Box>
        <Box cursor="pointer">FASHION</Box>
        <Box cursor="pointer">HIGH JEWELRY</Box>
        <Box cursor="pointer">FINE JEWELRY</Box>
        <Box cursor="pointer">WATCHES</Box>
        <Box cursor="pointer">EYEWEAR</Box>
        <Box cursor="pointer">FRAGRANCE</Box>
        <Box cursor="pointer">MAKEUP</Box>
        <Box cursor="pointer">SKINCARE</Box>
        <Box cursor="pointer" onClick={getPoint}>
          EVENT
        </Box>
      </Flex>
    </>
  );
};

export default Header;

// HOME FASHION HIGH JEWELRY FINE JEWELRY WATCHES EYEWEAR FRAGRANCE MAKEUP SKINCARE
