import React from "react"
import { Text, Input as ChakraInput, FormErrorMessage, FormControl } from "@chakra-ui/react"

export default function Input({ label, placeholder, value, onChange, error, size, variant }) {
  return (
    <FormControl isInvalid={error} mb="4">
      <Text size="sm" mb="4">
        {label}
      </Text>
      <ChakraInput placeholder={placeholder} value={value} onChange={onChange} size={size} variant={variant} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
