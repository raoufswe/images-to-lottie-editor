import { Box, Flex, Grid, Text, Heading } from "@chakra-ui/react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import FileBase64 from "react-file-base64";
import LayerOptions from "./components/LayerOptions";
import useStore from "./store";
import AnimationsOptions from "./components/AnimationsOptions";

function App() {
  const {
    lottieFile,
    selectedLayer,
    visibleLayers,
    setImage,
    setSelectedLayer,
  } = useStore();

  return (
    <Grid gridTemplateColumns="1fr 2fr 1fr">
      <Flex
        flexDir="column"
        overflow="auto"
        borderRight="2px"
        w="100%"
        h="100vh"
      >
        <Flex p="4" flexDir="column">
          <Heading mb="2" size="sm" color="gray.500">
            Upload your images
          </Heading>
          <FileBase64 onDone={setImage} />
        </Flex>
        <Flex flexDir="column">
          <Heading size="sm" mb="2" color="gray.500" px="4">
            Layers
          </Heading>
          {lottieFile.layers.map((layer) => (
            <Flex
              key={layer.nm}
              onClick={() => setSelectedLayer(layer)}
              alignItems="center"
              cursor="pointer"
              width="100%"
              py="2"
              px="4"
              mb="2"
              bg={selectedLayer?.nm === layer.nm ? "teal" : ""}
              _hover={{ background: "teal" }}
              borderRadius="4px"
            >
              <Box w="48px" h="48x" borderRadius="4px " bg="white">
                <Player
                  src={{
                    ...lottieFile,
                    layers: lottieFile.layers.filter((i) => i.nm === layer.nm),
                  }}
                />
              </Box>
              <Text ml="2" fontSize="sm">
                {layer.nm}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex margin="auto 4em" flexDir="column">
        <Player
          autoplay
          loop
          src={{
            ...lottieFile,
            layers: lottieFile.layers.filter((i) =>
              visibleLayers.map((i) => i.nm).includes(i.nm)
            ),
          }}
          style={{ width: 500, height: 500, borderRadius: "8px 8px 0 0 " }}
        >
          <Controls
            visible={true}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      </Flex>

      <Box p="2rem" borderLeft="1px">
        {selectedLayer && <LayerOptions />}
      </Box>
    </Grid>
  );
}

export default App;
