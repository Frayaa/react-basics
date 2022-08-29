import { useState } from "react"
import { useEffect } from "react"
import { Text, Box, Button, Stack, HStack, flex } from "@chakra-ui/react"

const Counter = () => {
  const [counter, setCounter] = useState(0)
  const [showCounter, setShowCounter] = useState(true)

  const incrementCounter = () => {
    // alert("Function execute")
    // setCounter(7)
    setCounter(counter + 1)
  }

  const decrementCounter = () => {
    if (counter <= 0) {
      return
    }
    setCounter(counter - 1)
  }

  const reCounter = () => {
    setCounter(0)
  }

  const toogleCounter = () => {
    setShowCounter(!showCounter)
  }

  useEffect(() => {
    if (!counter) {
      return
    }

    if (counter % 3 === 0) {
      alert("Fizz")
    } else if (counter % 5 === 0) {
      alert("Buzz")
    } else {
      alert(counter)
    }
  }, [counter])

  return (
    <Box>
      <Text>Counter Page</Text>
      {showCounter ? (
        <Text fontSize="4xl" fontWeight="bold">
          {counter}
        </Text>
      ) : null}

      <Stack width="400px">
        <HStack width="400px" spacing="5">
          <Button flex={1} colorScheme="twitter" onClick={reCounter}>
            Return
          </Button>
          <Button flex={1} colorScheme="green" onClick={incrementCounter}>
            Tambah
          </Button>
          <Button flex={1} colorScheme="red" onClick={decrementCounter}>
            Kurang
          </Button>
        </HStack>
        <Button colorScheme="yellow" onClick={toogleCounter}>
          Toogle Counter Visibility{" "}
        </Button>
      </Stack>
    </Box>
  )
}

export default Counter
