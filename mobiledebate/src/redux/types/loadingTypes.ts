export const START_LOADING = 'START_LOADING'
export const FINISH_LOADING = 'FINISH_LOADING'

export interface Loading {
    active_loading : number,
}

interface START_LOADING_ACTION {
    type : typeof START_LOADING
    payload : boolean
}

interface FINISH_LOADING_ACTION {
    type : typeof FINISH_LOADING
    payload : boolean

}


export type LoadingActions = START_LOADING_ACTION | FINISH_LOADING_ACTION