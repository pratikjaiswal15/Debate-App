import { Auth, AuthActions, GET_TOKEN , SAVE_TOKEN, REMOVE_TOKEN , ERROR_LOADING_TOKEN } from '../types/authTypes'

const initialState : Auth = {
    userToken : null,
    loading : true,
    error : ''
}

const authReducer = (state = initialState , action : AuthActions ) => {

    switch(action.type) {
        case GET_TOKEN : {
            return {
                ...state,
                userToken : action.payload,
                loading : false
            }
        }

        case SAVE_TOKEN : {
            return {
                ...state,
                userToken : action.payload,
                loading : false

            }
        }


        case REMOVE_TOKEN : {
            return {
                ...state,
                loading : false,
                userToken : null
            }
        }

        case ERROR_LOADING_TOKEN : {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        }

        default : return state
    }
}


export default authReducer