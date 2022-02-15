import { Global } from "@mantine/core"
import React, { ReactElement } from "react"

export default function GlobalStyle(): ReactElement {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        html: {
          height: "100%",
          width: "100%",
        },
        body: {
          padding: 0,
          margin: 0,
          height: "100%",
          width: "100%",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
          lineHeight: theme.lineHeight,
        },

        div: {
          //   height: '100%',
        },
        [`#__next`]: {
          minHeight: "100vh",
          height: "100%",
        },
        [`.full`]: {
          height: "100%",
        },
        a: {
          textDecoration: "none",
          color: "inherit",
        },
      })}
    />
  )
}
