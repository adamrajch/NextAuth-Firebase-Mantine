import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { useState } from "react"
import GlobalStyle from "../styles/Global"
import "./styles.css"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("dark")
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  return (
    <>
      <Head>
        <title>Periodize</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          emotionOptions={{ key: "mantine", prepend: false }}
          theme={{
            colorScheme: colorScheme,
            primaryColor: "cyan",
            fontFamily: "Verdana, sans-serif",
            fontFamilyMonospace: "Monaco, Courier, monospace",
            headings: { fontFamily: "Greycliff CF, sans-serif" },
          }}
          styles={{
            Box: {
              root: {
                width: "100%",
              },
            },
            Text: {},
            Group: {
              root: {
                padding: 0,
                margin: 0,
              },
            },
            Title: {
              root: {
                color: colorScheme === "dark" ? "white" : "black",
              },
            },

            // Container: {
            //   root: {
            //     paddingRight: matches ? "md" : 6,
            //     paddingLeft: matches ? "md" : 6,
            //   },
            // },
          }}
          withNormalizeCSS
        >
          <ModalsProvider>
            <GlobalStyle />
            <NotificationsProvider>
              <SessionProvider session={pageProps.session} refetchInterval={0}>
                <Component {...pageProps} />
              </SessionProvider>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}
