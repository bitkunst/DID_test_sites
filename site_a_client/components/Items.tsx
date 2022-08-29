import { Badge, Box } from "@chakra-ui/react";
import Image from "next/image";
import { ReactNode } from "react";
import itemJSON from "../public/items.json";
import { Item } from "../interface/item.interface";

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

  return (
    <Box width="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
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

        <Box>{property.formattedPrice}</Box>

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
