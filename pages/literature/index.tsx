import { Box, Group, TextInput } from "@mantine/core"
import axios from "axios"
import router from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai"
import BookSearchContainer from "../../components/BooksSearch/BookSearchContainer"
export default function BooksHome() {
  const [val, setVal] = useState("harry potter")
  const [books, setBooks] = useState<any>([])
  const [query, setQuery] = useState<string>("")
  const searchInputRef = useRef<any>(null)

  const search = (e: any) => {
    e.preventDefault()
    const term = searchInputRef.current.value

    if (!term) return
    router.push({
      pathname: `/literature/search`,
      query: {
        term: term,
        page: 1,
      },
    })
    // router.push(`/literature/search?term=${term}`)
  }
  const uri = `https://www.googleapis.com/books/v1/volumes?q=${val}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
  const url = `https://www.googleapis.com/books/v1/volumes?q=harry%20potter&key=AIzaSyDTl6EyWaIguVvXBXpN_csEm2Uj8f3FU0E`
  useEffect(() => {
    axios.get(uri).then((data) => {
      setBooks(data.data.items)
    })
  }, [])

  return (
    <div>
      <form>
        <TextInput
          label="Search"
          icon={<AiOutlineSearch />}
          value={query}
          onChange={(e: any) => setQuery(e.currentTarget.value)}
          rightSection={
            query.length > 0 ? (
              <AiOutlineClose
                onClick={() => setQuery("")}
                style={{ cursor: "pointer" }}
              />
            ) : null
          }
          onKeyPress={(e) => e.key == "Enter" && search(e)}
          ref={searchInputRef}
        />
      </form>

      <BookSearchContainer books={books} />
      <Group grow>
        <Box component="a"></Box>
      </Group>
    </div>
  )
}
