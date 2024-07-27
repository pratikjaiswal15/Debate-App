import axios from 'axios'
import { ADD_USER, GET_USER, INITIATE_REQUEST, REQUEST_FAILURE, User , UserActionTypes } from '../types/userTypes'
import { URL } from '../../shared/url'
import { setObject, setItem, clearAll } from '../../../src/shared/storage'


export const addUser = (user : User) : UserActionTypes => {
    return {
        type: ADD_USER,
        payload : user,
    }
}

export const getUser = (user : User) : UserActionTypes => {
    return {
        type: GET_USER,
        payload : user,
    }
}

export const initiateRequest = () : UserActionTypes => {
    return {
        type: INITIATE_REQUEST,
    }
}

export const failure = (error : string) : UserActionTypes => {
    return {
        type: REQUEST_FAILURE,
        payload : error
    }
}



export const login = (email : string) => {
    return(dispatch : any ) => {

        dispatch(initiateRequest)
        axios.get(`${URL}users/email/${email}`).then(data => {
            console.log(data.data)
            dispatch(getUser(data.data))
            let user = {
                id : data.data._id,
                name : data.data.name,
                email : data.data.email,
            }
            setObject('user', user).then(val => console.log(val))    
        


        }).catch(err => {
            console.log(err)
            dispatch(failure(err))
        })
    }
}


export const signUp = (user : User) => {
    return(dispatch : any ) => {

        dispatch(initiateRequest)
        axios.post(`${URL}users`, user ).then(data => {
            console.log(data.data)
            dispatch(getUser(data.data))
            let user = {
                id : data.data._id,
                name : data.data.name,
                email : data.data.email,
            }
            setObject('user', user).then(val => console.log(val))
            
        }).catch(err => {
            console.log(err)
            dispatch(failure(err))
        })
    }
}





