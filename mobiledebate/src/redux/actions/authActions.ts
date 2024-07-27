import { GET_TOKEN , SAVE_TOKEN , REMOVE_TOKEN, AuthActions, ERROR_LOADING_TOKEN } from '../types/authTypes'
import { getItem, setItem, clearAll } from '../../shared/storage'

const DUMMY_TOKEN  = 'dummy-token'

export const getToken = (token : string | undefined | null) : AuthActions => {
    return {
        type : GET_TOKEN,
        payload : token
    }
}

export const saveToken = (token : string) : AuthActions => {
    return {
        type : SAVE_TOKEN,
        payload : token
    }
}


export const removeToken = () : AuthActions => {
    return {
        type : REMOVE_TOKEN
    }
}

export const tokenError = (error : string) : AuthActions => {
    return {
        type : ERROR_LOADING_TOKEN,
        payload : error
    }
}

export const getUserToken = () => {
    return(dispatch : any) => {
        getItem('userToken').then(data => {
            console.log(data)
            dispatch(getToken(data))
        }).catch(err => {
            console.log(err)
            dispatch(tokenError(err.message))
        })
    }
}


export const saveUserToken = () => {
    return(dispatch : any) => {
        setItem('userToken', DUMMY_TOKEN).then(data => {
            console.log(data)
            dispatch(saveToken('token saved'))
        }).catch(err => {
            console.log(err)
            dispatch(tokenError(err.message))
        })
    }
}


export const removeUserToken = () : any => {
    return(dispatch : any) => {
        clearAll().then(data => {
            console.log(data)
            dispatch(removeToken())
        }).catch(err => {
            console.log(err)
            dispatch(tokenError(err.message))
        })
    }
}