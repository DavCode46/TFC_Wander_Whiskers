import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import PostCreator from "./PostCreator";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from 'javascript-time-ago'

import es from 'javascript-time-ago/locale/es.json'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addLocale(es)
TimeAgo.addLocale(en)



const Post = ({
  postId,
  title,
  image,
  location,
  createdAt,
  creatorId,
  content,
  specie,
  condition,
}) => {
  const substrContent =
    content.length > 70 ? content.substr(0, 70) + "..." : content;
  const substrTitle = title.length > 40 ? title.substr(0, 40) + "..." : title;

  return (
    <Card
      variant="outline"
      mb="5"
      mt="5"
      className="hover:card__selected hover:shadow-2xl transition-all duration-300"
    >
      <Flex direction={{ base: "column", md: "row" }}>
        <Image
          objectFit="cover"
          maxW={{ base: "100%", md: "200px" }}
          src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${image}`}
          alt={title}
        />
        <Stack ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }} flex="1">
          <CardBody>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">{substrTitle}</Heading>

              <Link
                to={`/posts/location/${location}`}
                className="bg-color-btn text-white py-2 px-4 rounded-md hover:bg-color-btnHover transition duration-300 hover:text-white"
              >
                {location}
              </Link>
            </Flex>
            <Text py="2" mt="3">
              {substrContent}
            </Text>
          </CardBody>
          <CardFooter className="flex justify-between items-center">
            <Link
              to={`/post/${postId}/detail`}
              className="bg-color-btn text-white py-2 px-4 rounded-md hover:bg-color-btnHover transition duration-300 hover:text-white"
            >
              Ver más
            </Link>

            <Button
              colorScheme={
                condition === "Perdido"
                  ? "red"
                  : condition === "En adopción"
                  ? "yellow"
                  : "green"
              }
              size="sm"
              hover="none"
            >
              {condition}
            </Button>
            <small className=' whitespace-nowrap'><ReactTimeAgo date={new Date(createdAt)} locale='es' /></small>
            <input type="hidden" name={specie} id={specie} />
          </CardFooter>
        </Stack>
      </Flex>
    </Card>
  );
};

export default Post;
