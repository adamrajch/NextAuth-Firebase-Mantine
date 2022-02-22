import React, { ReactElement } from "react"
import { Center, Title, Text, Group, Button } from "@mantine/core"
import { useRouter } from "next/router"
export default function Custom404() {
  const router = useRouter()
  return (
    <Center style={{ height: "70vh", width: "100%" }}>
      <Group direction="column" position="center">
        <Title
          align="center"
          sx={(theme) => ({
            fontSize: 64,
            letterSpacing: 8,
            [`@media (max-width:  ${theme.breakpoints.sm}px)`]: {
              fontSize: 42,
            },
          })}
        >
          404
        </Title>
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
          - Page Not Found -
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

        <Button size="xl" variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </Group>
    </Center>
  )
}
