import React, { useEffect } from 'react'
import { RootState } from '../redux/rootReducers';
import { connect } from 'react-redux';
import { Loading } from '../redux/types/loadingTypes';
import { ActivityIndicator, Text, View, StatusBar, StyleSheet } from 'react-native';
import { Loading_action } from '../redux/actions/loadingActions'

interface props {
    loading: Loading,

}

const HttpLoading: React.FC<props> = ({ loading }) => {


    return (
        loading.active_loading > 0 ? 
            <View style={styles.horizontal}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View> : null
    )

}

const mapStateToProps = (state: RootState) => ({
    loading: state.loading,
});



const styles = StyleSheet.create({
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});



export default connect
    (mapStateToProps, { Loading_action })
    (HttpLoading)

