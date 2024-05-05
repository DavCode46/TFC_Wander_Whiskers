import {
  Select,
  Input,
  InputGroup,
  Stack,
  Button,
  FormControl,
  Box,
  Textarea,
  InputLeftAddon,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { contactOptions } from "@/data/data.js";

import { FaRegUser } from "react-icons/fa";


const Contact = () => {
  return (
    <section className="flex justify-center items-center h-screen">
    <Box className="w-full md:w-3/5 lg:w-2/4 xl:w-1/3">
      <section className="create-post__section">
        <div className="">
          <h2>Contactar</h2>
          <form action="">
            <Stack spacing={4}>
              <InputGroup size="sm">
                <InputLeftAddon
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1rem"
                >
                  <FaRegUser />
                </InputLeftAddon>
                <Input
                  type="text"
                  name="petName"
                  placeholder="Nombre completo"
                  size="sm"
                  _focus={{ outline: "none", border: 'none' }}
                  fontSize={{ base: "sm", md: "md", lg: "md"}}
                  aria-label="Nombre de la mascota"
                  autoComplete="both"
                />
                <Select size="sm" name="breed"  fontSize={{ base: "sm", md: "md", lg: "md"}}   _focus={{ outline: "none", border: 'none' }}>
                  <option value="consulta">Motivo de consulta</option>
                  {contactOptions.map((option, index) => (
                    <option key={index} value={option.value} >
                      {option.label}
                    </option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1rem"
                >
                  <PhoneIcon color="gray.300" />
                </InputLeftAddon>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono de contacto"
                  width="100%"
                  size="sm"
                  _focus={{ outline: "none", border: 'none' }}
                  fontSize={{ base: "sm", md: "md", lg: "md"}}
                  aria-label="Teléfono de contacto"
                  autoComplete="both"
                />
              </InputGroup>

              <InputGroup size="sm">
                <InputLeftAddon
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1rem"
                >
                  <EmailIcon color="gray.300" />
                </InputLeftAddon>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email de contacto"
                  width="100%"
                  size="sm"
                  _focus={{ outline: "none", border: 'none' }}
                  fontSize={{ base: "sm", md: "md", lg: "md"}}
                  aria-label="email de contacto"
                  autoComplete="both"
                />
              </InputGroup>

              <FormControl id="description">
                <Textarea
                  name="description"
                  placeholder="Mensaje de consulta"
                  resize="none"
                  rows={6}
                  _focus={{ outline: "none", border: 'none' }}
                  fontSize={{ base: "sm", md: "md", lg: "md"}}
                />
              </FormControl>
             

              <Button type="submit" bg={"btn"} color={'white'} _hover={{ bg: 'btnHover' }}  w="100%" size='sm'>
                Contactar
              </Button>
            </Stack>
          </form>
        </div>
      </section>
    </Box>
    </section>
  )
}

export default Contact