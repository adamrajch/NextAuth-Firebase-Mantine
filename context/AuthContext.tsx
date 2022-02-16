import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import router from "next/router"
import nookies from "nookies"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../firebase"
import { createUser } from "../lib/CreateUser"
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
  const [authUser, loading, error] = useAuthState(auth)
  const [user, setUser] = useState<any>(null)

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

      if (authUser) {
        const formattedUser = await formatUser(authUser)
        const { token, ...userWithoutToken } = formattedUser

        const ref = doc(db, "users", authUser.uid)

        const docSnap = await getDoc(ref)
        if (docSnap.exists()) {
          setUser(docSnap.data())
        } else {
          console.log(authUser)
          createUser(authUser.uid, userWithoutToken)
          setUser(user)
        }

        unsubscribe = onSnapshot(ref, (doc) => {
          console.log("sets user, ", doc.data())
          setUser(doc.data())
        })

        nookies.set(undefined, "token", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        })
        router.push("/")
        return unsubscribe
      } else {
        nookies.set(undefined, "token", "", { path: "/" })

        setUser(null)
        router.push("/login")
      }

      return unsubscribe
    }

    handleUser()

    return
  }, [authUser])

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

        router.push("/")
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
