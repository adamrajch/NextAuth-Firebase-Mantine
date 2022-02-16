import { Text } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
interface NavLink {
  href: string
  title: string
}

export default function NavLink({ title, href }: NavLink) {
  const router = useRouter()
  return (
    <Link href={href}>
      <Text
        size="xl"
        align="center"
        sx={(theme) => ({
          cursor: "pointer",
          backgroundColor: router.pathname === href ? theme.colors.dark[6] : "",
          letterSpacing: 3,
          padding: 12,
          borderRadius: 8,
          borderColor: theme.colors.gray[8],
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.gray[9]
                : theme.colors.gray[3],
          },
        })}
      >
        {title}
      </Text>
    </Link>
  )
}
