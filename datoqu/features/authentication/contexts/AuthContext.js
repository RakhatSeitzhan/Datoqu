'use client'
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../../../firebase"
import { signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "@firebase/auth"

const AuthContext = createContext()

function AuthProvider({ children }){
    const [user, setUser] = useState()
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }
    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    },[ user ]) 
    return <AuthContext.Provider value = {{user, googleSignIn, logOut}}>{children}</AuthContext.Provider>
}
function useAuth(){
    return useContext(AuthContext)
}

export { AuthProvider, useAuth}
