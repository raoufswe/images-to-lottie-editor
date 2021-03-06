import { Flex, Text, Button } from "@chakra-ui/react"
import { animations } from "../../parser"
import useStore from "../../store"

export default function AnimationsOptions() {
  const { setAnimation } = useStore()
  return (
    <>
      <Text size="sm">Animations</Text>
      <Flex flexDir="column">
        {animations.map(({ name, value }) => (
          <Button colorScheme="teal" mt="4" key={name} onClick={() => setAnimation(value)}>
            {name}
          </Button>
        ))}
      </Flex>
    </>
  )
}
