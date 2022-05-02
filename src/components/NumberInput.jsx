import {
  Flex,
  Text,
  NumberInput as ChakaraNumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react"

export default function NumberInput({ label, defaultValue, onChange, value, ...props}) {
  return (
    <Flex flexDir="column" w="100%" mb="4">
      <Text size="sm" mb="2">
        {label}
      </Text>
      <ChakaraNumberInput inputMode="numeric" defaultValue={defaultValue} onChange={onChange} value={value} {...props}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakaraNumberInput>
    </Flex>
  )
}
