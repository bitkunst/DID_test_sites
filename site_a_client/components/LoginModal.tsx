import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import Router from "next/router";

function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {
      userId: { value: userId },
      userPw: { value: userPw },
    } = e.target;

    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:4001/api/user/login",
        { userId, userPw }
      );
      if (!response.data.error) {
        alert("로그인 되었습니다.");
        Router.push("/");
      } else {
        throw new Error("No such user exists");
      }
    } catch (err) {
      alert("로그인이 정상적으로 처리되지 않았습니다. 다시 시도해 주세요.");
    }

    console.log(userId, userPw);
  };

  return (
    <>
      <Button colorScheme="blackAlpha" onClick={onOpen}>
        Login
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>L O G I N</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormLabel>I D</FormLabel>
              <Input name="userId" ref={initialRef} placeholder="Id" />
              <FormLabel mt={5}>P A S S W O R D</FormLabel>
              <Input name="userPw" type="password" placeholder="Password" />
            </ModalBody>

            <ModalFooter display="flex" justifyContent="space-between">
              <Box>
                <Button colorScheme="teal">DID Login</Button>
              </Box>
              <Box alignSelf="flex-end">
                <Button type="submit" colorScheme="blackAlpha" mr={3}>
                  Login
                </Button>
                <Button colorScheme="blackAlpha" onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;
