import { Pagination, TextInput } from "@mantine/core"
import axios from "axios"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import React, { useState } from "react"
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai"
import BookSearchContainer from "../../../components/BooksSearch/BookSearchContainer"

export default function SearchBooks({ results }: any) {
  const [val, setVal] = useState(" ")
  const [books, setBooks] = useState<any>(results)
  const [query, setQuery] = useState<string>("")
  const uri = `https://www.googleapis.com/books/v1/volumes?q=${val}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`

  console.log("results: ", results)
  //   useEffect(() => {
  //     axios.get(uri).then((data) => {
  //       setBooks(data.data.items)
  //     })
  //   }, [])
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
        />
      </form>

      <BookSearchContainer books={books} />
      <Pagination total={10} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let results = null
  const startIndex = context.query.start || "0"
  try {
    const data = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${context.query.term}&startIndex=${startIndex}&maxResults=24&orderBy=relevance&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
    )
    console.log(data.data.items.length)
    results = data.data.items
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      results: results.length ? results : [],
    },
  }
}
