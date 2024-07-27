import { setItem, clearAll } from './storage'

export const authLogin = () => {
    setItem('isLoggedIn', 'true')
}


export const authLogout = () => {
    clearAll()
}