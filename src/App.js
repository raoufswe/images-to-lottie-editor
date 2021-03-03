import { useQuery } from "react-query"
import axios from "axios"
import { Box, Flex, Grid, Text, Heading } from "@chakra-ui/react"
import { Player, Controls } from "@lottiefiles/react-lottie-player"
import testLottie from "./test.json"

// const url = `https://assets10.lottiefiles.com/private_files/lf30_k5obblw6.json`
// const colorsAPI = "https://editor-api.lottiefiles.com/colors"

function App() {
  // const { data } = useQuery(url, async () => {
  //   const { data } = await axios.get(url)
  //   return data
  // })
  // const colorQuery = useQuery([colorsAPI, url, "colors"], async () => {
  //   const { data } = await axios.post(colorsAPI, { url, type: "shape", color: "" })
  //   return data
  // })
  console.log(testLottie)

  return (
    <Grid gridTemplateColumns="1fr 2fr 1fr" h="100vh" w="100vw">
      <Flex flexDir="column" m="4" overflow="auto" height="90%" borderRight="2px">
        <Heading size="md" mb="4">
          Layers
        </Heading>
        {testLottie.layers.map((layer) => (
          <Flex mb="4" alignItems="center" key={layer.nm}>
            <Box w="50px" h="50x" borderRadius="4px " bg="white">
              <Player
                src={{
                  ...testLottie,
                  layers: testLottie.layers.filter((i) => i.nm === layer.nm)
                }}
              />
            </Box>

            <Text ml="2">{layer.nm}</Text>
          </Flex>
        ))}
      </Flex>
      <Flex margin="auto 4em">
        <Player autoplay loop src={testLottie}>
          <Controls visible={true} buttons={["play", "repeat", "frame", "debug"]} />
        </Player>
      </Flex>
      <div>Configs</div>
    </Grid>
  )
}

export default App
