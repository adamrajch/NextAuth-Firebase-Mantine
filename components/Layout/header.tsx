import {
  Avatar,
  Button,
  Divider,
  Group,
  Menu,
  Text,
  Title,
} from "@mantine/core"
import Link from "next/link"
import { useAuth } from "../../context/AuthContext"

export default function Header() {
  const { user, signout } = useAuth()

  return (
    <header>
      <Group position="apart" noWrap grow>
        <Title>Bloom</Title>

        <Group position="right">
          {!user && (
            <>
              <Link href="/login">
                <Button>Sign in</Button>
              </Link>
            </>
          )}

          {user && (
            <Menu
              control={
                <Group style={{ cursor: "pointer" }}>
                  <Avatar
                    src={user.photoUrl}
                    alt="profile"
                    radius="xl"
                    color="blue"
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
          )}
        </Group>
      </Group>
    </header>
  )
}
