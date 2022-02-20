import { Button } from "@mantine/core"
import React, { useEffect } from "react"
import { useSignInWithGithub } from "react-firebase-hooks/auth"
import { AiOutlineGithub } from "react-icons/ai"
import { auth } from "../../firebase"
export default function GithubLoginButton({ setError }: any) {
  const [signInWithGithub, user, loading, error] = useSignInWithGithub(auth)

  useEffect(() => {
    if (error) {
      setError(error.message)
    }
  }, [error])
  return (
    <>
      <Button
        variant="outline"
        leftIcon={<AiOutlineGithub />}
        onClick={() => signInWithGithub()}
        // disabled={error ? true : false}
      >
        Github
      </Button>
    </>
  )
}
