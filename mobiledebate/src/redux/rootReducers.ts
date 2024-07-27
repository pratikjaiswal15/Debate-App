import { combineReducers } from 'redux'

import userReducer from './reducers/userReducer'
import authReducer from './reducers/authReducer'
import loadinReducer from './reducers/loadingReducer'

const rootReducer = combineReducers({
    user : userReducer,
    auth : authReducer,
    loading : loadinReducer
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
