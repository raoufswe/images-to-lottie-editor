import { useState } from "react"
import {
  Box,
  Flex,
  Grid,
  Text,
  Heading,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react"
import { Player, Controls } from "@lottiefiles/react-lottie-player"
import testLottie from "./among-us.json"
import FileBase64 from "react-file-base64"
import { composeNewLayer, deleteLayer, updateOpacity, resizeAsset, getAsset } from "./parser"
import { CloseIcon } from "@chakra-ui/icons"

function App() {
  const [lottieFile, setLottieFile] = useState(testLottie)
  const [selectedLayer, setSelectedLayer] = useState(null)
  const [configs, setConfigs] = useState()

  const onImageUploaded = (newImage) => {
    const newLottie = composeNewLayer(lottieFile, newImage)
    setLottieFile(newLottie)
  }

  const onLayerDelete = (layer) => {
    const newLottieFile = deleteLayer(lottieFile, layer)
    setLottieFile(newLottieFile)
  }

  const onOpacityChange = (value) => {
    const newLottieFile = updateOpacity(lottieFile, selectedLayer, value)
    setLottieFile(newLottieFile)
  }

  const onResizeAsset = ({ h, w }) => {
    const newLottieFile = resizeAsset(lottieFile, selectedLayer, { h, w })
    setLottieFile(newLottieFile)
  }

  const selectedAsset = getAsset(lottieFile, selectedLayer?.nm)

  const onLayerSelect = (layer) => {
    setSelectedLayer(layer)
    const selectedAsset = getAsset(lottieFile, layer?.nm)
    setConfigs({ ...configs, ...(selectedAsset ? { w: selectedAsset.w, h: selectedAsset.h } : {}), opacity: layer.ks.o.k })
  }

  const handleChange = (value, name) => {
    setConfigs({ ...configs, [name]: value })
    switch (name) {
      case "opacity":
        onOpacityChange(value)
        break
      case "w":
        onResizeAsset({ w: value })
        break
      case "h":
        onResizeAsset({ h: value })
        break
      default:
        break
    }
  }

  return (
    <Grid gridTemplateColumns="1fr 2fr 1fr">
      <Flex flexDir="column" m="1rem" overflow="auto" borderRight="2px" w="100%" h="100vh">
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
          <Flex mb="4" alignItems="center" key={layer.nm} my="2" mr="4" bg={selectedLayer?.nm === layer.nm ? "teal" : ""} borderRadius="4px" p="2">
            <Flex onClick={onLayerSelect.bind(null, layer)}>
              <Box w="50px" h="50x" borderRadius="4px " bg="white">
                <Player src={{ ...lottieFile, layers: lottieFile.layers.filter((i) => i.nm === layer.nm) }} />
              </Box>
              <Text ml="2">{layer.nm}</Text>
            </Flex>
            <IconButton icon={<CloseIcon />} onClick={onLayerDelete.bind(null, layer)} size="sm" ml="auto" />
          </Flex>
        ))}
      </Flex>
      <Flex margin="auto 4em" flexDir="column">
        <Player autoplay loop src={lottieFile}>
          <Controls visible={true} buttons={["play", "repeat", "frame", "debug"]} />
        </Player>
      </Flex>
      <Box p="2rem">
        {selectedLayer && (
          <Flex flexDir="column" w="100%">
            <Flex flexDir="column" w="100%">
              <Heading size="sm" mb="2">
                Opacity:
              </Heading>
              <Slider
                aria-label="slider-ex-1"
                defaultValue={selectedLayer?.ks.o.k}
                onChange={(value) => handleChange(value, "opacity")}
                name="opacity"
                value={configs.opacity}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Flex>
            {selectedAsset && (
              <>
                <Flex flexDir="column" w="100%" mt="2">
                  <Heading size="sm" mb="2">
                    Width
                  </Heading>
                  <NumberInput name="w" inputMode="numeric" defaultValue={selectedAsset.w} onChange={(value) => handleChange(value, "w")} value={configs.w}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>

                <Flex flexDir="column" w="100%" mt="2">
                  <Heading size="sm" mb="2">
                    Height
                  </Heading>
                  <NumberInput name="h" inputMode="numeric" defaultValue={selectedAsset.h} onChange={(value) => handleChange(value, "h")} value={configs.h}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </>
            )}
          </Flex>
        )}
      </Box>
    </Grid>
  )
}

export default App
