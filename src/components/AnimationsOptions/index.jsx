import { Flex, Heading, Button } from "@chakra-ui/react";
import { animations } from "../../parser";
import useStore from "../../store";

export default function AnimationsOptions() {
  const { setAnimation } = useStore();
  return (
    <>
      <Heading size="sm" mb="2" pt="5">
        Animations
      </Heading>
      <Flex flexDir="column">
        {animations.map((animation, index) => (
          <Button
            colorScheme="teal"
            mt="4"
            key={index}
            onClick={() => setAnimation(index)}
          >
            Animation {index}
          </Button>
        ))}
      </Flex>
    </>
  );
}
