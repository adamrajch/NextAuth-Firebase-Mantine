import {
  AppShell,
  Burger,
  Container,
  Divider,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import UserButton from "../Login/UserButton"
import ColorModeSwitch from "./ColorModeSwitch"
import NavLink from "./NavLink"
interface Props {
  children: React.ReactNode
}
export default function AppLayout({ children }: Props) {
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()
  const { user, loading } = useAuth()
  interface NavLink {
    href: string
    title: string
  }
  const navlinks = [
    { href: "/about", title: "about" },
    { href: "/literature", title: " literature" },
    { href: "/movies", title: "movies" },
  ]
  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <Navbar
          padding="md"
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint={2000}
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%

          width={{ sm: 300, md: 0, lg: 0 }}
        >
          {navlinks.map((n: NavLink, i: number) => (
            <Navbar.Section mt="lg" key={n.href}>
              <NavLink href={n.href} title={n.title} />
            </Navbar.Section>
          ))}
          <Navbar.Section grow>
            <Group position="center" my={16}>
              <ColorModeSwitch />
            </Group>
          </Navbar.Section>
          <Navbar.Section>
            <Divider style={{ padding: 8 }} />
          </Navbar.Section>
          <Navbar.Section>
            <UserButton />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} padding="md" style={{ backgroundColor: "#2b2d42" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Link href="/">
              <Title style={{ cursor: "pointer", color: "whitesmoke" }}>
                Bloom
              </Title>
            </Link>

            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <Group position="right">
                <Link href="/about">
                  <Text
                    size="lg"
                    sx={{
                      cursor: "pointer",
                      letterSpacing: "2px",
                      color: "whitesmoke",
                      "&:hover": {
                        color: "darkgray",
                      },
                    }}
                  >
                    about
                  </Text>
                </Link>
                <Link href="/literature">
                  <Text
                    size="lg"
                    sx={{
                      cursor: "pointer",
                      letterSpacing: "2px",
                      color: "whitesmoke",
                      "&:hover": {
                        color: "darkgray",
                      },
                    }}
                  >
                    literature
                  </Text>
                </Link>
                <Link href="/movies">
                  <Text
                    size="lg"
                    sx={{
                      cursor: "pointer",
                      letterSpacing: "2px",
                      color: "whitesmoke",
                      "&:hover": {
                        color: "darkgray",
                      },
                    }}
                  >
                    movies
                  </Text>
                </Link>
                <UserButton />
                <ColorModeSwitch />
              </Group>
            </MediaQuery>
          </div>
        </Header>
      }
    >
      <Container size="xl" style={{ marginBottom: 40 }}>
        {children}
      </Container>
    </AppShell>
  )
}
