import { Box, Flex, Text, Heading } from "@chakra-ui/react"
import useStore from "../store"
import { Player } from "@lottiefiles/react-lottie-player"

export default function Layers() {
  const { lottieFile, selectedLayer, setSelectedLayer } = useStore()

  return (
    <Flex flexDir="column">
      <Heading size="sm" mb="4" px="4">
        Layers
      </Heading>
      {lottieFile.layers.map((layer) => (
        <Flex
          key={layer.uuid}
          onClick={() => setSelectedLayer(layer)}
          alignItems="center"
          cursor="pointer"
          width="100%"
          py="2"
          px="4"
          mb="2"
          bg={selectedLayer?.uuid === layer.uuid ? "teal" : ""}
          _hover={{ background: "teal" }}
          borderRadius="4px"
        >
          <Box w="48px" h="48x" borderRadius="4px " bg="white">
            <Player src={{ ...lottieFile, layers: lottieFile.layers.filter((i) => i.uuid === layer.uuid) }} />
          </Box>
          <Text ml="2" fontSize="sm">
            {layer.nm}
          </Text>
        </Flex>
      ))}
    </Flex>
  )
}
