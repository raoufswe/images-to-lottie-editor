import { useState, useEffect } from "react"
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
  const getLottie = useGetLottie()
  const errorToast = useErrorToast()
  const [files, setFiles] = useState([])
  const { setImage, setRemoteLottieFile } = useStore()

  const onSubmit = () => {
    try {
      if (files.length) {
        const { file, getFileEncodeDataURL, fileExtension } = files[0]
        if (["svg", "png", "jpeg", "jpg"].includes(fileExtension)) setImage(file, getFileEncodeDataURL())
        else errorToast({ description: "File format is not supported" })
      } else if (lottieUrl) {
        if (lottieUrl.includes(".json")) getLottie.mutate(lottieUrl)
        else errorToast({ description: "URL must be type of Lottie file" })
      } else if (getLottie.isError) errorToast()
      else errorToast({ description: "You must add an image or LottieFile to get started" })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (getLottie.data) setRemoteLottieFile(getLottie.data)
  }, [getLottie.data, setRemoteLottieFile])

  return (
    <>
      <ChakaraModal isOpen={true} isCentered size="xl" closeOnOverlayClick={false} m="4">
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
            <Button colorScheme="blue" mr={3} onClick={onSubmit} isDisabled={(!files.length && !lottieUrl) || getLottie.isLoading}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakaraModal>
    </>
  )
}
