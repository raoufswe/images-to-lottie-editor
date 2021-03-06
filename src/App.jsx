import { Flex, Grid, Heading, Divider, Button } from "@chakra-ui/react"
import { Player, Controls } from "@lottiefiles/react-lottie-player"
import FileBase64 from "react-file-base64"
import useStore from "./store"
import NumberInput from "./components/NumberInput"
import BoardingModal from "./components/BoardingModal"
import Layers from "./components/Layers"
import LayerOptions from "./components/LayerOptions"

function App() {
  const { setImage, lottieFile } = useStore()
  if (!lottieFile) return <BoardingModal />

  return (
    <Grid gridTemplateColumns="1fr 2fr 1fr">
      <Flex flexDir="column" overflow="auto" borderRight="2px" w="100%" h="95vh" position="relative">
        <Flex p="4" flexDir="column" w="100%">
          <Heading mb="4" size="sm">
            Upload your images
          </Heading>
          <FileBase64 onDone={setImage} style={{ cursor: "pointer" }} />
        </Flex>
        <Divider mb="4" />
        <Layers />
      </Flex>

      <Flex margin="auto" flexDir="column">
        <MainPlayer />
      </Flex>

      <Flex flexDir="column" overflow="auto" w="100%" h="100vh" p="4" borderLeft="1px">
        <LayerOptions />
        <LottieFileConfigs />
      </Flex>
    </Grid>
  )
}

function MainPlayer() {
  const { lottieFile, visibleLayers } = useStore()
  let clonedVisibleLayers = JSON.parse(JSON.stringify(lottieFile.layers.filter((i) => visibleLayers.map((i) => i.nm).includes(i.nm))))
  return (
    <Player autoplay loop src={{ ...lottieFile, layers: clonedVisibleLayers }} style={{ width: "100%", height: "100%", borderRadius: "8px 8px 0 0" }}>
      <Controls visible={true} buttons={["play", "repeat", "frame", "debug"]} style={{ borderRadius: "8px" }} />
    </Player>
  )
}

function LottieFileConfigs() {
  const { lottieFile, setFrameRate } = useStore()
  return (
    <>
      <NumberInput defaultValue={lottieFile.fr} label="Frame rate" name="frameRate" onChange={setFrameRate} />
      <a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(lottieFile))}`} download={`lottie_${Date.now()}.json`}>
        <Button colorScheme="blue" mb="4" w="100%">
          Download as JSON
        </Button>
      </a>
    </>
  )
}

export default App
