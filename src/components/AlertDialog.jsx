import { useState, useRef } from "react"
import {
  AlertDialog as ChakaraDeleteDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react"

export default function AlertDialog({ title, onDelete }) {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  return (
    <>
      <Button colorScheme="red" onClick={() => setIsOpen(true)} mt="4" w="100%">
        {title}
      </Button>
      <ChakaraDeleteDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onDelete()
                  onClose()
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </ChakaraDeleteDialog>
    </>
  )
}
