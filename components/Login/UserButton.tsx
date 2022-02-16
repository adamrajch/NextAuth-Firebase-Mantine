import { Avatar, Divider, Group, Menu, Text } from "@mantine/core"
import React from "react"
import { useAuth } from "../../context/AuthContext"

type Props = {}

export default function UserButton() {
  const { user, signout } = useAuth()
  if (!user) {
    return null
  }
  return (
    <Menu
      control={
        <Group style={{ cursor: "pointer" }} position="center" grow>
          <Avatar
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
