import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../firebase"

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [authUser] = useAuthState(auth)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe

    if (authUser) {
      // const ref = firestore.collection('users').doc(user.uid);
      const ref = doc(db, "users", user.uid)
      unsubscribe = onSnapshot(ref, (doc) => {
        setUser(doc.data()?.user)
      })
    } else {
      setUser(null)
    }

    return unsubscribe
  }, [authUser])

  return { user }
}
