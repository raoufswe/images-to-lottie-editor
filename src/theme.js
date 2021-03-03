import { extendTheme } from "@chakra-ui/react"

export default extendTheme({
  styles: {
    global: {
      body: { overflow: "hidden" }
    }
  },
  fonts: {
    body: "DM Sans, sans-serif",
    heading: "DM Sans, sans-serif",
    mono: "DM Sans, sans-serif"
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false
  }
})
