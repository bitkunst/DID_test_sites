import { Badge, Box } from "@chakra-ui/react";
import Image from "next/image";
import { ReactNode, useContext } from "react";
import itemJSON from "../public/items.json";
import { Item } from "../interface/item.interface";
import { Global } from "../pages/_app";
import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";

type propertyProps = {
  itemNum: string;
};

type itemType = {
  [key: string]: Item;
};

const ItemCard: React.FC<propertyProps> = ({ itemNum }) => {
  const num = "property" + itemNum;
  const item: itemType = itemJSON;

  const property = {
    imageUrl: item[num]["imageUrl"],
    imageAlt: item[num]["imageAlt"],
    title: item[num]["title"],
    formattedPrice: item[num]["formattedPrice"],
    reviewCount: item[num]["reviewCount"],
  };

  const { isLogin, setUserToken, userData, setUserData } = useContext(Global);
  const [, setCookie] = useCookies();

  const buyItem = async () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    if (setUserToken === undefined) return;

    try {
      const response = await axios.post(
        "http://localhost:4001/api/user/buyItem",
        { userData, itemPrice: property.formattedPrice }
      );
      const { error, result, token } = response.data;
      if (error && !result) {
        alert("포인트가 부족합니다.");
      } else if (!error && result) {
        setUserToken(token);
        setCookie("CHANNEL_Token", token);
        alert("상품 구매가 완료되었습니다.");
      }
    } catch (err) {
      const error = err as AxiosError<any>;
      console.log(error);
      alert(
        "상품 구매가 정상적으로 처리되지 않았습니다. 잠시후 다시 시도해주십시요."
      );
    }
  };

  return (
    <Box
      width="300px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={buyItem}
      cursor="pointer"
    >
      <Image
        src={property.imageUrl}
        alt={property.imageAlt}
        width="200px"
        height="200px"
        layout="responsive"
      />
      {/* <Image src={property.imageUrl} layout="fill" /> */}

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {property.title}
        </Box>

        <Box>{property.formattedPrice} points</Box>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemCard;
