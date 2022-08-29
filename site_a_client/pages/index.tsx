import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import type { NextPage } from "next";
import ItemCard from "../components/Items";

const Home: NextPage = () => {
  const buyItem = () => {
    console.log("hihi");
  };
  return (
    <>
      <Flex p="20">
        <Box onClick={buyItem} cursor="pointer">
          <ItemCard itemNum={"1"} />
        </Box>
        <Spacer />
        <Box onClick={buyItem} cursor="pointer">
          <ItemCard itemNum={"2"} />
        </Box>
        <Spacer />
        <Box onClick={buyItem} cursor="pointer">
          <ItemCard itemNum={"3"} />
        </Box>
      </Flex>

      <Flex p="20">
        <Box onClick={buyItem} cursor="pointer">
          <ItemCard itemNum={"4"} />
        </Box>
        <Spacer />
        <Box onClick={buyItem} cursor="pointer">
          <ItemCard itemNum={"5"} />
        </Box>
        <Spacer />
        <Box onClick={buyItem} cursor="pointer">
          <ItemCard itemNum={"6"} />
        </Box>
      </Flex>
    </>
  );
};

export default Home;
