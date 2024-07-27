import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { login, signUp } from '../redux/actions/userActions'
import { connect } from 'react-redux'
import { User } from '../redux/types/userTypes'
import { RootState } from '../redux/rootReducers'
import { saveUserToken, removeUserToken} from '../redux/actions/authActions'
import axios from 'axios'
interface props {
    userData : any,
    login : ((email : string) => void),
    signUp : ((user : User) => void),
    saveToken : () => void,
    removeToken : () => void

}

const GmailLogin : React.FC<props> = ({userData, login, signUp, saveToken, removeToken}) => {

    useEffect(() => {
        console.log("hi")

        GoogleSignin.configure({
            webClientId: '686831845008-vbipr0q7rv3bgck40gsj79rsrnkcorta.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            accountName: '', // [Android] specifies an account name on the device that should be used       
        });
    }, [])


    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const {additionalUserInfo, user } = await auth().signInWithCredential(googleCredential);
            if(additionalUserInfo?.isNewUser) {

                console.log("new user")
                // add to database
                let data = {
                    name : String(user.displayName),
                    email : String(user.email),
                    photo : String(user.photoURL),
                    uid : String(user.uid)
                }
                console.log(data)
                await signUp(data)
                saveToken()

            }
            else {
                // load user id from database
                console.log("old user")

                let data = {
                    name : String(user.displayName),
                    email : String(user.email),
                    photo : String(user.photoURL),
                    uid : String(user.uid),
                }
                console.log(data)
                await login(String(user.email))
                saveToken()
            }

            
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error) // user cancelled the login flow


            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log(error)

            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log(error)

            } else {
                // some other error happened
                console.log(error)
            }
        }
    };


    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
             GoogleSignin.signOut().then(async () => {
                console.log("logout")
                removeToken()
            });
            //setUserInfo(null); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn} />
           
           <Button  title="logout" onPress={(signOut)}/>
        </View>
         
    )
}

const mapStateToProps = (state : RootState ) => {
    return {
        userData : state.user,
        token : state.auth
    }
}

const mapDispatchToProps = (dispatch : any) => {
    return {
        login: (email : string) => dispatch(login(email)),
        signUp : (user : User) => dispatch(signUp(user)),
        saveToken : () => dispatch(saveUserToken()),
        removeToken : () => dispatch(removeUserToken())      
    }
}

export default connect
(mapStateToProps, mapDispatchToProps)
(GmailLogin)
