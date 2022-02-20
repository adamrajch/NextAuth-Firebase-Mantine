import { Grid } from "@mantine/core"
import React from "react"
import Book from "./Book"

type Props = {
  books: Array<any>
}

export default function BookSearchContainer({ books }: Props) {
  return (
    <Grid gutter="sm">
      {books.map((b: any) => (
        <Grid.Col md={3} lg={2} sm={6} xs={6}>
          <Book key={b.id} id={b.id} data={b.volumeInfo} />
        </Grid.Col>
      ))}
    </Grid>
  )
}
