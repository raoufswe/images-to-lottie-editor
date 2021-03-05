import {
  Flex,
  Heading,
  NumberInput as ChakaraNumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react"

export default function NumberInput({ label, defaultValue, onChange, value }) {
  return (
    <Flex flexDir="column" w="100%" mb="4">
      <Heading size="sm" mb="2">
        {label}
      </Heading>
      <ChakaraNumberInput inputMode="numeric" defaultValue={defaultValue} onChange={onChange} value={value}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakaraNumberInput>
    </Flex>
  )
}
