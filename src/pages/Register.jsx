import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import RegisterModal from "../components/RegisterModal"

// Condition form
// 1. username harus 3 karakter atau lebih
// 2. email harus terisi
// 3. password harus 8 karakter atau lebih
// 4. gender harus terisi

// jika condition form tidak terpenuhi dan button
// register di-click, tampilkan sebuah "TOAST" dengan
// warna/scheme "error"

// jika condition form terpenuhi, tampilkan modal

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [users, setUsers] = useState([
    {
      username: "seto",
      email: "seto@mail.com",
      password: "password123",
      gender: "male",
    },
  ])

  const toast = useToast()

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const registerBtnHandler = () => {
    if (username.length >= 3 && email && password.length >= 8 && gender) {
      const check = users.filter((item) => item.username === username)
      const checkEmail = users.filter((item) => item.email === email)
      if (check.length > 0 || checkEmail.length > 0) {
        toast({
          title: "Username or Email Already Exists",
          status: "error",
        })
      } else {
        let newUser = {
          username,
          password,
          email,
          gender,
        }
        setModalIsOpen(true)

        setUsers([...users, newUser])
      }
    } else {
      toast({
        title: "Form is still invalid",
        status: "error",
      })
    }
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const deleteUserBtnHandler = (idx) => {
    let tempUsers = [...users]
    tempUsers.splice(idx, 1)

    setUsers(tempUsers)
  }

  const renderUsers = () => {
    return users.map((val, idx) => {
      return (
        <Stack
          spacing={4}
          border="1px solid black"
          borderRadius="8px"
          padding="12px"
        >
          <Text>Username: {val.username}</Text>
          <Text>Email: {val.email}</Text>
          <Text>Password: {val.password}</Text>
          <Text>Gender: {val.gender}</Text>
          <Button onClick={() => deleteUserBtnHandler(idx)} colorScheme="red">
            Delete
          </Button>
        </Stack>
      )
    })
  }

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem>
          <Box padding="4" border="1px solid black" borderRadius="8px">
            <Stack spacing={4}>
              <Text fontSize="2xl" fontWeight="black">
                Register
              </Text>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={showPassword ? "text" : "password"}
                    pr="60px"
                  />
                  <InputRightElement width="56px" mr="4px">
                    <Button onClick={togglePassword} height="28px" size="sm">
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <RadioGroup onChange={(value) => setGender(value)} value={gender}>
                <FormLabel>Gender</FormLabel>
                <HStack>
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </HStack>
              </RadioGroup>
              <Button
                onClick={registerBtnHandler}
                alignSelf="center"
                colorScheme="green"
              >
                Register
              </Button>
            </Stack>
          </Box>
        </GridItem>
        <GridItem height="80vh" overflowY="scroll">
          <Stack>{renderUsers()}</Stack>
        </GridItem>
      </Grid>

      <RegisterModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        username={username}
        email={email}
        gender={gender}
        password={password}
      />
    </>
  )
}

export default Register
