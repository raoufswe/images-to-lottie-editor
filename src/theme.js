import { extendTheme } from "@chakra-ui/react"

export default extendTheme({
  styles: {
    global: {
      body: { overflow: "hidden" }
    }
  },
  fonts: {
    body: "'Montserrat', sans-serif",
    heading: "'Montserrat', sans-serif",
    mono: "'Montserrat', sans-serif"
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false
  }
})
