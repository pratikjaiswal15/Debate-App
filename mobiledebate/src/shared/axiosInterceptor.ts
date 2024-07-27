import axios from 'axios'
import firebase from '@react-native-firebase/app';
import store from '../redux/store';
import { removeUserToken } from '../redux/actions/authActions'
import { Alert } from 'react-native';
import { START_LOADING, FINISH_LOADING } from '../redux/types/loadingTypes'

axios.interceptors.request.use(async function (config) {
    // Do something before request is sent

    store.dispatch({type : START_LOADING, payload : true})
    console.log("show loading")
    const token = await firebase.auth().currentUser?.getIdToken()
    config.headers.Authorization = `Bearer ${token}`

    return config;
  }, function (error) {
      console.log(error)
      store.dispatch({type : FINISH_LOADING, payload : false})
      console.log("finish loading1")

      // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.dispatch({type : FINISH_LOADING, payload : false})
    console.log("finish loading2")

    return response;
  }, function (error) {

    store.dispatch({type : FINISH_LOADING, payload : false})
    console.log("finish loading3")
    console.log(error.response)


 /*   switch(error.response.status) {
      case 401 : {
        console.log('unauthorized error')
        store.dispatch(removeUserToken())
        break;
      }

      default :  {
        console.log(error)
        //createTwoButtonAlert(error.response.status) 
      }
    } 
    */
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


  const createTwoButtonAlert = (status : any) =>
    Alert.alert(
      "Oops! Error",
      String(status),
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
