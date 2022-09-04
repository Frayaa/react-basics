import {
  Box,
  Container,
  Tbody,
  Text,
  Thead,
  Tr,
  Th,
  Table,
  useToast,
  Button,
  GridItem,
  FormControl,
  Grid,
  FormLabel,
  Input,
  Td,
  FormErrorMessage,
  Link as ChakraLink,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { jsonServerApi } from "../api"
import { useFormik } from "formik"
import axios from "axios"
import * as Yup from "yup"
import { Link } from "react-router-dom"

const ProductList = () => {
  const [product, setProduct] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:2000/products")
      setProduct(response.data)
    } catch (err) {
      console.log(err)
      toast({
        title: "Network Error",
        status: "error",
      })
    }
  }

  const deleteBtnHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/products/${id}`)
      fetchProducts()
      toast({ title: "Product deleted", status: "info" })
    } catch (err) {
      console.log(err)
    }
  }
  const renderProducts = () => {
    return product.map((val) => {
      return (
        <Tr>
          <Td>{val.product_name}</Td>
          <Td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.price)}
          </Td>
          <Td>{val.stock}</Td>
          <Td>
            <Link to={`/products/${val.id}`}>
              <Button mx="1" colorScheme="green">
                Edit
              </Button>
            </Link>

            <Button
              onClick={() => deleteBtnHandler(val.id)}
              mx="1"
              colorScheme="red"
            >
              Delete
            </Button>
          </Td>
        </Tr>
      )
    })
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  const formik = useFormik({
    initialValues: {
      product_name: "",
      price: 0,
      stock: 0,
    },
    onSubmit: async (values) => {
      try {
        const { product_name, price, stock } = values

        let newProduct = {
          product_name,
          price,
          stock,
        }

        await axios.post("http://localhost:2000/products", newProduct)

        fetchProducts()
        toast({ title: "Product Added", status: "success" })
      } catch (err) {
        toast({ title: "Network Error", status: "error" })
        console.log(err)
      }
    },
    validationSchema: Yup.object({
      product_name: Yup.string().required(),
      price: Yup.number().required().min(1000).max(100000),
      stock: Yup.number().required().min(1),
    }),
    validateOnChange: false,
  })
  const formChangeHandler = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }
  const toast = useToast()

  return (
    <Container maxW="container.lg">
      <Text fontWeight="bold" fontSize="4xl" mb="16">
        Product List
      </Text>

      <Grid templateColumns="repeat(3, 1fr)" columnGap="4">
        <GridItem>
          <FormControl isInvalid={formik.errors.product_name}>
            <FormLabel>Product Name</FormLabel>
            <Input name="product_name" onChange={formChangeHandler} />
            <FormErrorMessage>{formik.errors.product_name}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isInvalid={formik.errors.price}>
            <FormLabel>Product Price</FormLabel>
            <Input name="price" onChange={formChangeHandler} type="number" />
            <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isInvalid={formik.errors.stock}>
            <FormLabel>Product Stock</FormLabel>
            <Input name="stock" onChange={formChangeHandler} type="number" />
            <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>
      <Button
        disabled={formik.isSubmitting}
        onClick={formik.handleSubmit}
        my="4"
        colorScheme="teal"
      >
        Add Product
      </Button>

      <Table>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>{renderProducts()}</Tbody>
      </Table>
    </Container>
  )
}

export default ProductList
