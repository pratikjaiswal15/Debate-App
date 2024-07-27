import { START_LOADING, FINISH_LOADING, Loading , LoadingActions } from '../types/loadingTypes'

const initialState : Loading = {
    active_loading : 0,
}

const loadinReducer = (state = initialState, action : LoadingActions) => {

    switch(action.type) {
        case START_LOADING : {
            state.active_loading++;
            return action.payload
        }

        case FINISH_LOADING : {
            state.active_loading--;
            return action.payload
        }

        default : return state
    }
}

export default loadinReducer