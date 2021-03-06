import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import type { AppProps } from "next/app"
import Head from "next/head"
import { useState } from "react"
import AppLayout from "../components/Layout/AppShell"
import { AuthProvider } from "../context/AuthContext"
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
        <title>Lit List</title>
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
            // primaryColor: "violet",
            fontFamily: "Open Sans",
            fontFamilyMonospace: "Monaco, Courier, monospace",

            colors: {
              brand: [],
              text: ["#7588a4", "#647380", "#516178"],
            },
            headings: {
              fontFamily: "Roboto, sans-serif",
              color: colorScheme === "dark" ? "white" : "#516178",
              sizes: {
                h1: { fontSize: 30 },
              },
            },
          }}
          styles={{
            Box: {
              root: {
                width: "100%",
              },
            },
            Text: {
              root: {
                color: colorScheme === "dark" ? "#a0b2c2" : "#647380",
              },
            },
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
          }}
          withNormalizeCSS
        >
          <ModalsProvider>
            <GlobalStyle />
            <NotificationsProvider>
              <AuthProvider>
                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
              </AuthProvider>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}
