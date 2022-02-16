import {
  Button,
  Container,
  Group,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { useNotifications } from "@mantine/notifications"
import NextLink from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import GithubLoginButton from "../components/Login/GithubLoginButton"
import GoogleLoginButton from "../components/Login/GoogleLoginButton"
import { auth } from "../firebase"

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)
  const notifications = useNotifications()

  const router = useRouter()

  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <Container size="xs" style={{ minHeight: "100vh" }}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Group
          grow
          position="center"
          direction="column"
          sx={(theme) => ({
            width: "100%",
            padding: 16,
            borderRadius: theme.radius.md,
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.dark[1],
          })}
        >
          <SimpleGrid cols={1}>
            <Title align="center">Login</Title>
            <TextInput
              type="email"
              label="email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <TextInput
              type="password"
              label="password"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            {error && <Text color="red">{error.message}</Text>}
            <Group position="apart">
              <NextLink href="/signup">
                <Text size="sm" style={{ cursor: "pointer" }}>
                  Create an account
                </Text>
              </NextLink>
              <NextLink href="/forgot-password">
                <Text size="sm" style={{ cursor: "pointer" }}>
                  Forgot Password?
                </Text>
              </NextLink>
            </Group>
            <Button
              variant="outline"
              onClick={() => signInWithEmailAndPassword(email, password)}
            >
              Submit
            </Button>
            <Group>
              <GithubLoginButton />
              <GoogleLoginButton />
            </Group>
          </SimpleGrid>
        </Group>
      </div>
    </Container>
  )
}
