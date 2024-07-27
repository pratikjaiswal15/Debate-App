export const GET_TOKEN = 'GET_TOKEN'
export const SAVE_TOKEN = 'SAVE_TOKEN'
export const REMOVE_TOKEN = 'REMOVE_TOKEN'
export const ERROR_LOADING_TOKEN = 'ERROR_LOADING_TOKEN'


export interface Auth {
    userToken : string | null | undefined,
    loading : boolean,
    error : string
}


interface GET_TOKEN_ACTION {
    type : typeof GET_TOKEN
    payload : string | undefined | null
}

interface SAVE_TOKEN_ACTION {
    type : typeof SAVE_TOKEN
    payload : string
}


interface REMOVE_TOKEN_ACTION {
    type : typeof REMOVE_TOKEN
}

interface ERROR_LOADING_TOKEN_ACTION {
    type : typeof ERROR_LOADING_TOKEN
    payload : string
} 


export type AuthActions = GET_TOKEN_ACTION | SAVE_TOKEN_ACTION | REMOVE_TOKEN_ACTION | ERROR_LOADING_TOKEN_ACTION