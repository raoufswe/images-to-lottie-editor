import { useToast } from "@chakra-ui/react"

export function useErrorToast() {
  const toast = useToast()
  return ({ description = "Something went wrong 😥", position = "bottom" }) => toast({ description, status: "error", position })
}

export function useSuccessToast() {
  const toast = useToast()
  return ({ description = "All is set 🎉", position = "bottom" }) => toast({ description, status: "success", position })
}
