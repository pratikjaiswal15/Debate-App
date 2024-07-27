export const ADD_USER = 'ADD_USER'
export const GET_USER = 'GET_USER'
export const INITIATE_REQUEST = 'INITIATE_REQUEST'
export const REQUEST_FAILURE = 'REQUEST_FAILURE'


export interface User {
    name : string;
    email : string;
    uid : string;
    photo?: string
}

export interface Initial {
    loading : boolean;
    users : User;
    error : string;
}


interface ADD_USER_ACTION {
    type : typeof ADD_USER
    payload : User
}

interface GET_USER_ACTION {
    type : typeof GET_USER
    payload : User

}

interface INITIATE_REQUEST {
    type : typeof INITIATE_REQUEST
}


interface REQUEST_FAILURE_ACTION {
    type : typeof REQUEST_FAILURE
    payload : string;    
}



export type UserActionTypes = ADD_USER_ACTION | GET_USER_ACTION | INITIATE_REQUEST | REQUEST_FAILURE_ACTION  
