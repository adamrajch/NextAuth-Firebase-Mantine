import {
  Center,
  Group,
  Pagination,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import axios from "axios"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai"
import BookSearchContainer from "../../../components/BooksSearch/BookSearchContainer"

export default function SearchBooks({ results, pages, term, page }: any) {
  const [val, setVal] = useState(" ")
  const [books, setBooks] = useState<any>([])
  const [query, setQuery] = useState<string>(term)
  const [activePage, setPage] = useState(page)
  const searchInputRef = useRef<any>(null)
  const router = useRouter()

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

  console.log("results: ", results)

  console.log("#pages : ", pages)
  console.log(" page  : ", page)
  useEffect(() => {
    setBooks(results)
  }, [results])
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
      {results.length > 0 ? (
        <>
          <BookSearchContainer books={books} />{" "}
          <Pagination
            total={pages}
            withEdges
            page={page}
            onChange={(page: number) => {
              router.push({
                pathname: `/literature/search`,
                query: {
                  term: term,
                  page: page,
                },
              })
            }}
          />
        </>
      ) : (
        <>
          <Center style={{ height: "70vh", width: "100%" }}>
            <Group direction="column" position="center">
              <Title
                align="center"
                sx={(theme) => ({
                  fontSize: 40,
                  letterSpacing: 8,
                  [`@media (max-width:  ${theme.breakpoints.sm}px)`]: {
                    fontSize: 20,
                  },
                })}
              >
                Your search yielded no results!
              </Title>
              <Text
                sx={(theme) => ({
                  fontSize: 40,
                  letterSpacing: 8,
                  [`@media (max-width:  ${theme.breakpoints.sm}px)`]: {
                    fontSize: 20,
                  },
                })}
              >
                😅
              </Text>

              {/* <Button size="xl" variant="outline" onClick={() => router.back()}>
                Go Back
              </Button> */}
            </Group>
          </Center>
        </>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let results = null

  const term = context.query.term || ""

  let pages
  let page = context.query.page ? parseInt(context.query.page as string, 10) : 0
  console.log("page server: ", page)
  console.log("startIndex: ", (page - 1) * 24)
  try {
    const data = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${term}&startIndex=${
        (page - 1) * 24
      }&maxResults=24&orderBy=relevance&key=${
        process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
      }`
    )
    console.log(data.data.totalItems)
    results = data.data.items
    console.log("results length: ", results.length)
    pages = Math.round(data.data.totalItems / 24)

    if (results.length) {
      return {
        props: {
          results: results?.length ? results : [],
          pages: pages,
          term: term,
          page,
        },
      }
    }
  } catch (error) {
    console.log(error)
    // return {
    //   props: {
    //     results: [],
    //     term: term,
    //     pages: 0,
    //     page: 0,
    //   },
    // }
  }

  return {
    props: {
      results: results?.length ? results : [],
      pages: pages,
      term: term,
      page,
    },
  }
}
