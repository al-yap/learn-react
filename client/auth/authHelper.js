// Upgrade to localStorage for future so 
// user auth state will be remembered across browser tabs
import { signout } from './apiAuth'

const auth = {
    authenticate(jwt, cb) {
        if (typeof window !== "undefined") {
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
        }
        cb()
    },
    isAuthenticated() {
        if (typeof window == "undefined") {
            return false
        }
        if (sessionStorage.getItem('jwt')) {
            return JSON.parse(sessionStorage.getItem('jwt'))
        } else {
            return false
        }
    },
    clearJwt(cb) {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem('jwt')
            cb()
            signout().then((data) => {
                document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            })
        }
    }
}

export default auth