import React, { useEffect } from 'react'
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken } from '../redux/actions/authActions'
import { RootState } from '../redux/rootReducers';
import { Auth } from '../redux/types/authTypes';


import Login from './login'
import Tabs from './tabs'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

interface props {
    token: Auth,
    getUserToken: () => void
}

const authLoading: React.FC<props> = ({ token, getUserToken }) => {

    useEffect(() => {
        getUserToken()
    }, [])

    if(token.loading) {
        return (
            <View style= {styles.horizontal}> 
                     <ActivityIndicator size="large" color="#00ff00"/>
             </View>
        )
    }

    return (


        <NavigationContainer>
            <Stack.Navigator>
                {token.userToken == undefined   ? 
                <Stack.Screen name="login" component={Login} /> : 
                <Stack.Screen name="tabs" component={Tabs} options ={{gestureEnabled : false}} /> }   
            </Stack.Navigator>
            
        </NavigationContainer>

    )
}

const mapStateToProps = (state: RootState) => ({
    token: state.auth,
});


const mapDispatchToProps = (dispatch: any) => ({
    getUserToken: () => dispatch(getUserToken()),
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});


export default connect
(mapStateToProps, mapDispatchToProps)
(authLoading)