import { Avatar, Button, Divider, Group, Menu, Text } from "@mantine/core"
import Link from "next/link"
import React from "react"
import { useAuth } from "../../context/AuthContext"

export default function UserButton() {
  const { user, signout } = useAuth()

  if (user === null) {
    return (
      <Group grow style={{ visibility: "hidden", height: 45 }}>
        <Text>hi</Text>
      </Group>
    )
  }
  if (user === false) {
    return (
      <Group position="center">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </Group>
    )
  }

  return (
    <Menu
      control={
        <Group style={{ cursor: "pointer" }} position="center" grow spacing={4}>
          <Avatar
            size="sm"
            src={user.photoUrl}
            alt="profile"
            radius="xl"
            color="blue"
            style={{ flex: 0 }}
          />

          <span>
            <Text
              sx={(theme) => ({
                "@media (max-width: 755px)": {
                  display: "none",
                },
              })}
            >
              {user.name ?? user.email}
            </Text>
          </span>
        </Group>
      }
    >
      <Menu.Item>Profile</Menu.Item>
      <Menu.Item>My Lists</Menu.Item>
      <Menu.Item>Settings</Menu.Item>

      <Divider />

      <Menu.Item color="red" onClick={signout}>
        Sign out
      </Menu.Item>
    </Menu>
  )
}
