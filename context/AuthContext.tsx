import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { doc, onSnapshot } from "firebase/firestore"
import router from "next/router"
import nookies from "nookies"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../firebase"
// import { createUser } from "../hooks/createUser"

type Props = {
  children?: React.ReactNode
}
const AuthContext = createContext<any>({})

export function AuthProvider({ children }: Props) {
  const auth = useUserData()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)

export function useUserData() {
  const [authUser, authLoading, error] = useAuthState(auth)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<any>(true)
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    return () => clearInterval(handle)
  }, [])

  useEffect(() => {
    async function handleUser() {
      let unsubscribe: any
      if (authLoading) {
        return
      }
      if (authUser) {
        // const formattedUser = await formatUser(authUser)
        // const { token, ...userWithoutToken } = formattedUser
        const token = await authUser.getIdToken(true)
        const ref = doc(db, "users", authUser.uid)

        nookies.set(undefined, "token", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        })

        unsubscribe = onSnapshot(ref, (doc) => {
          console.log("sets user, ", doc.data())
          setUser(doc.data())
          setLoading(false)
        })

        return unsubscribe
      } else {
        nookies.set(undefined, "token", "", { path: "/" })
        setUser(false)
      }

      return unsubscribe
    }

    handleUser()
    setLoading(false)
    return () => {
      setLoading({})
    }
  }, [authUser, authLoading])

  const signinWithGoogle = (redirect: any) => {
    return signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        if (redirect) {
          router.push(redirect)
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage, errorCode)
      })
  }
  const signinWithGithub = (redirect: any) => {
    return signInWithPopup(auth, new GithubAuthProvider())
      .then((response) => {
        if (redirect) {
          router.push(redirect)
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage, errorCode)
      })
  }
  const signout = () => {
    return signOut(auth)
      .then(() => {
        console.log("sucessfully logged out")

        router.push("/login")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { user, loading, error, signinWithGithub, signinWithGoogle, signout }
}

async function formatUser(user: any) {
  const token = await user.getIdToken(true)
  return {
    token: token,
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
    provider: user.providerData[0].providerId,
  }
}
