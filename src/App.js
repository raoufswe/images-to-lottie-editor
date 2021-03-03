import { useState } from "react"
import { Box, Flex, Grid, Text, Heading } from "@chakra-ui/react"
import { Player, Controls } from "@lottiefiles/react-lottie-player"
import testLottie from "./among-us.json"
import FileBase64 from "react-file-base64"
import { composeNewLayer } from "./parser"

function App() {
  const [lottieFile, setLottieFile] = useState(testLottie)
  const onImageUploaded = (newImage) => {
    const newLottie = composeNewLayer(lottieFile, newImage)
    setLottieFile(newLottie)
  }

  return (
    <Grid gridTemplateColumns="1fr 2fr 1fr">
      <Flex flexDir="column" m="4" overflow="auto" borderRight="2px">
        <Flex mb="4" flexDir="column">
          <Heading mb="4" size="md">
            Upload your images
          </Heading>
          <FileBase64 onDone={onImageUploaded} />
        </Flex>
        <Heading size="md" mb="4">
          Layers
        </Heading>
        {lottieFile.layers.map((layer) => (
          <Flex mb="4" alignItems="center" key={layer.nm}>
            <Box w="50px" h="50x" borderRadius="4px " bg="white">
              <Player src={{ ...lottieFile, layers: lottieFile.layers.filter((i) => i.nm === layer.nm) }} />
            </Box>
            <Text ml="2">{layer.nm}</Text>
          </Flex>
        ))}
      </Flex>
      <Flex margin="auto 4em" flexDir="column">
        <Player autoplay loop src={lottieFile}>
          <Controls visible={true} buttons={["play", "repeat", "frame", "debug"]} />
        </Player>
      </Flex>
      <Box></Box>
    </Grid>
  )
}

export default App
