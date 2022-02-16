import { Button } from "@mantine/core"
import React from "react"
import { useSignInWithGithub } from "react-firebase-hooks/auth"
import { AiOutlineGithub } from "react-icons/ai"
import { auth } from "../../firebase"
export default function GithubLoginButton() {
  const [signInWithGithub, user, loading, error] = useSignInWithGithub(auth)

  return (
    <Button
      variant="outline"
      leftIcon={<AiOutlineGithub />}
      onClick={() => signInWithGithub()}
    >
      Github
    </Button>
  )
}
