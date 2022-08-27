import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import LoginModal from "./LoginModal";

const Header = () => {
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
          <LoginModal />
          <Link href="/regist">
            <Button colorScheme="blackAlpha">Sign Up</Button>
          </Link>
        </ButtonGroup>
      </Box>

      <Flex w="100%" justify="space-evenly" align="center" gap="2" mt="25px">
        <Box cursor="pointer">HOME</Box>
        <Box cursor="pointer">FASHION</Box>
        <Box cursor="pointer">HIGH JEWELRY</Box>
        <Box cursor="pointer">FINE JEWELRY</Box>
        <Box cursor="pointer">WATCHES</Box>
        <Box cursor="pointer">EYEWEAR</Box>
        <Box cursor="pointer">FRAGRANCE</Box>
        <Box cursor="pointer">MAKEUP</Box>
        <Box cursor="pointer">SKINCARE</Box>
      </Flex>
    </>
  );
};

export default Header;

// HOME FASHION HIGH JEWELRY FINE JEWELRY WATCHES EYEWEAR FRAGRANCE MAKEUP SKINCARE
