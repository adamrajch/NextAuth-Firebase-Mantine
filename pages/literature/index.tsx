import { Box, Group } from "@mantine/core"
import axios from "axios"
import React, { useEffect, useState } from "react"
import BookSearchContainer from "../../components/BooksSearch/BookSearchContainer"
export default function BooksHome() {
  const [val, setVal] = useState("harry potter")
  const [books, setBooks] = useState<any>([])
  const uri = `https://www.googleapis.com/books/v1/volumes?q=${val}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
  const url = `https://www.googleapis.com/books/v1/volumes?q=harry%20potter&key=AIzaSyDTl6EyWaIguVvXBXpN_csEm2Uj8f3FU0E`
  useEffect(() => {
    axios.get(uri).then((data) => {
      setBooks(data.data.items)
    })
  }, [])
  return (
    <div>
      {/* <Title>Discover the best of all time</Title> */}
      <BookSearchContainer books={books} />
      <Group grow>
        <Box component="a"></Box>
      </Group>
    </div>
  )
}
