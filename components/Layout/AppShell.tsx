import {
  AppShell,
  Burger,
  Divider,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Title,
  useMantineTheme,
} from "@mantine/core"
import { useState } from "react"
import UserButton from "../Login/UserButton"
import ColorModeSwitch from "./ColorModeSwitch"
import NavLink from "./NavLink"
interface Props {
  children: React.ReactNode
}
export default function AppLayout({ children }: Props) {
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()
  interface NavLink {
    href: string
    title: string
  }
  const navlinks = [
    { href: "/about", title: "about" },
    { href: "/books", title: " books" },
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
          hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%

          width={{ sm: 300 }}
        >
          {navlinks.map((n: NavLink, i: number) => (
            <Navbar.Section
              mt="lg"
              //   grow={i === navlinks.length - 1}
              key={n.href}
            >
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
        <Header height={70} padding="md">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Title>Bloom</Title>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}
