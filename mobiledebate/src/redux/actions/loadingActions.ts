import { START_LOADING , FINISH_LOADING, LoadingActions } from '../types/loadingTypes'

/*
export const showLoaidng = ()  : LoadingActions => {
    return {
        type : START_LOADING
    }
}

export const hideLoaidng = ()  : LoadingActions => {
    return {
        type : FINISH_LOADING
    }
}
*/


export const Loading_action = (bool : boolean)=>{
    return bool ? {
      type: START_LOADING,
      data:bool
    }: {
      type: FINISH_LOADING,
      data: bool
    }
  }
  

