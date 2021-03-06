import { useMutation } from "react-query"
import axios from "axios"

export default function useGetLottie() {
  return useMutation(async (url) => {
    const response = await axios.get(url)
    return response.data
  })
}
