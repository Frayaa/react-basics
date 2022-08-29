import Profile from "./components/Profile/"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Counter from "./pages/Counter"
import TextPage from "./pages/Text"
import List from "./pages/List"
import Filter from "./pages/Filter"
import { Text, UnorderedList, ListItem, Box } from "@chakra-ui/react"
import Register from "./pages/Register"

const data = [
  {
    fullName: "Naruto",
    position: "Hokage",
    age: 17,
  },
  {
    fullName: "Doraemon",
    position: "kucing",
    age: 100,
  },
  {
    fullName: "Bill",
    position: "CEO",
    age: 40,
  },
]

function App() {
  const renderProfiles = () => {
    let result = data.map((val) => {
      return (
        <Profile
          FullName={val.fullName}
          position={val.position}
          age={val.age}
        />
      )
    })

    // let result = []

    // for (let i = 0; i < data.length; i++) {
    //   result.push(
    //     <Profile
    //       FullName={data[i].fullName}
    //       position={data[i].position}
    //       age={data[i].age}
    //     />
    //   )
    // }
    return result
  }

  return (
    <Box>
      <Text fontSize={"3xl"} fontWeight="bold" color="blue.600">
        Hello World!
      </Text>
      <UnorderedList>
        <ListItem>
          <Link to="/home">Home</Link>
        </ListItem>
        <ListItem>
          <Link to="/about">About</Link>
        </ListItem>
        <ListItem>
          <Link to="/counter">Counter</Link>
        </ListItem>
        <ListItem>
          <Link to="/register">Register</Link>
        </ListItem>
      </UnorderedList>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/text" element={<TextPage />} />
        <Route path="/list" element={<List />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Box>
  )
}

export default App
