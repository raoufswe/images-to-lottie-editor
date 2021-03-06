import { useQuery } from "react-query"
import axios from "axios"
import useDebounce from "./useDebounce"

export default function useGetLottie(url) {
  const debouncedValue = useDebounce(url, 1000)
  return useQuery(
    debouncedValue,
    async () => {
      const { data } = await axios.get(debouncedValue)
      return data
    },
    { enabled: Boolean(url) }
  )
}
