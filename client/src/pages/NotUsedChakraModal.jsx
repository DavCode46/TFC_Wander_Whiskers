import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import PropTypes from 'prop-types'

const ChakraModal = ({
    buttonOpen,
    legend,
    buttonSubmit
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

 
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        {buttonOpen}
      </Button>
      

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{legend}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre completo</FormLabel>
              <Input ref={initialRef} placeholder="Nombre" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" placeholder="Email" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Contraseña actual</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Contraseña actual"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Nueva contraseña</FormLabel>
              <Input
                name="newPassword"
                type="password"
                placeholder="Nueva contraseña"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Confirmar Nueva Contraseña</FormLabel>
              <Input
                name="confirmNewPassword"
                type="password"
                placeholder="Confirmar contraseña"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              {buttonSubmit}
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

ChakraModal.propTypes = {
    buttonOpen: PropTypes.string,
    buttonSubmit: PropTypes.string,
    legend: PropTypes.string
}

export default ChakraModal;
