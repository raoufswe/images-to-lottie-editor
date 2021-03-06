import { useState } from "react"
import { Modal as ChakaraModal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider, Box, Text } from "@chakra-ui/react"
import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileEncode from "filepond-plugin-file-encode"
import Input from "./Input"
import useStore from "../store"
import { useErrorToast } from "../hooks/useToast"
import useGetLottie from "../hooks/useGetLottie"
import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode)

export default function Modal() {
  const [lottieUrl, setLottieUrl] = useState("")
  const lottieQuery = useGetLottie(lottieUrl)
  const errorToast = useErrorToast()
  const [files, setFiles] = useState([])
  const { setImage, setRemoteLottieFile } = useStore()

  const onSubmit = () => {
    if (files.length) {
      const { file, getFileEncodeDataURL } = files[0]
      setImage(file, getFileEncodeDataURL())
    } else if (lottieUrl) setRemoteLottieFile(lottieQuery.data)
    else if (lottieQuery.isError) errorToast()
    else errorToast({ description: "You must add an image or LottieFile to get started" })
  }
  return (
    <>
      <ChakaraModal isOpen={true} isCentered size="xl" closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Get started!</ModalHeader>
          <ModalBody>
            <Input
              label="Add LottieFile URL"
              placeholder="https://lottiefile.com/example"
              value={lottieUrl}
              onChange={({ target }) => setLottieUrl(target.value)}
            />
            <Divider />
            <Text mt="4" size="sm">
              Or upload your image here directly
            </Text>
            <Box mt="4">
              <FilePond files={files} onupdatefiles={setFiles} labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>' />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSubmit} isDisabled={(!files.length && !lottieUrl) || lottieQuery.isLoading}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakaraModal>
    </>
  )
}
