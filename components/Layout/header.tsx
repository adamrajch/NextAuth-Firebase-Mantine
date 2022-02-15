import { Button, Group, Image, Title } from "@mantine/core"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header>
      <Group position="apart" noWrap grow>
        <Title>Bloom</Title>

        <Group position="right">
          <p>
            {!session && (
              <>
                <Button
                  component="a"
                  href={`/api/auth/signin`}
                  onClick={(e: any) => {
                    e.preventDefault()
                    signIn()
                  }}
                >
                  Sign in
                </Button>
              </>
            )}
          </p>

          {session?.user && (
            <>
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt="profile"
                  width={25}
                  height={25}
                />
              )}
              <span>
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <Button
                component="a"
                href={`/api/auth/signout`}
                onClick={(e: any) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </Button>
            </>
          )}
        </Group>
      </Group>
    </header>
  )
}
