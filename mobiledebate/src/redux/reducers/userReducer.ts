import { ADD_USER, GET_USER, INITIATE_REQUEST, REQUEST_FAILURE, UserActionTypes, Initial } from '../types/userTypes'


const initialState : Initial  = {
    loading : false,
    users : {name : '' , email : '', photo : '' , uid : ''},
    error : '',

}

const userReducer = (state = initialState, action : UserActionTypes) => {
    switch(action.type){
        case ADD_USER : {
            return {
                ...state,
                loading : false,
                users : action.payload,
                error : '',
            }
        }

        case GET_USER : {
            return {
                ...state,
                loading : false,
                users : action.payload,
                error : '',
            }
        }

        case INITIATE_REQUEST : {
            return {
                ...state,
                loading : true
            }
        }

        case REQUEST_FAILURE : {
            return {

                ...state,
                loading : false,
                users : [],
                error : action.payload
            }
        }

        


        default : return state
    }

}

export default userReducer

