import { Flex, Heading, Slider as ChakaraSlider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react"

export default function Slider({ label, onChange, defaultValue }) {
  return (
    <Flex flexDir="column" w="100%" mb="4">
      <Heading size="sm" mb="2">
        {label} {defaultValue}%
      </Heading>
      <ChakaraSlider key={defaultValue} aria-label="slider-ex-1" onChangeEnd={onChange} defaultValue={defaultValue}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </ChakaraSlider>
    </Flex>
  )
}
