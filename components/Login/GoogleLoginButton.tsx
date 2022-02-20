import { Button } from "@mantine/core"
import React, { useEffect } from "react"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { AiOutlineGoogle } from "react-icons/ai"
import { auth } from "../../firebase"
export default function GoogleLoginButton({ setError }: any) {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
  useEffect(() => {
    if (error) {
      setError(error.message)
    }
  }, [error])
  return (
    <Button
      variant="outline"
      leftIcon={<AiOutlineGoogle />}
      onClick={() => signInWithGoogle()}
    >
      Google
    </Button>
  )
}
