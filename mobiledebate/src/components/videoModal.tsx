import React, { useState } from 'react'
import { Text } from 'react-native-svg'
import { View, Button, StyleSheet, Dimensions } from 'react-native'
import Modal from 'react-native-modal'
import Video, {
    OnSeekData,
    OnLoadData,
    OnProgressData,
} from 'react-native-video';

interface props {
    modalVisible : boolean,
    selectedItem : any,
    onClose : () => void
}

const VideoModal : React.FC<props> = ({modalVisible, selectedItem, onClose}) =>{

    
    return (

         <View>
                <Modal isVisible={modalVisible}
                    swipeDirection={'down'}
                    swipeThreshold={200}
                    onSwipeComplete={() => console.log('swiped')}
                    propagateSwipe={true}
                    onBackdropPress = {() => console.log("pressed back")}
                >
                    <View style={{ flex: 1 }}>
                        <Video
                            source={{
                                uri: selectedItem.url
                            }}
                            controls={false}
                            resizeMode={'contain'}
                            style = {styles.video}
                            
                        />
                        <Button title="Hide modal" onPress={onClose} />
                    </View>
                </Modal>
            </View> 

    )
}

const styles = StyleSheet.create({
    video: {
        height: Dimensions.get('window').width * (9 / 16),
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
    },
})
export default VideoModal
