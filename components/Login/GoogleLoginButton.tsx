import { Button } from "@mantine/core"
import React from "react"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { AiOutlineGoogle } from "react-icons/ai"
import { auth } from "../../firebase"
export default function GoogleLoginButton() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

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
