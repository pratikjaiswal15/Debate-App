import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Text, View, FlatList, TouchableOpacity, Image, ImageSourcePropType, StyleSheet, Button, Dimensions } from 'react-native'
import VideoPlayer from 'react-native-video-controls';
import VideoAndroid from './videoPlayer.android'
import Modal from 'react-native-modal';
import Video, {
    OnSeekData,
    OnLoadData,
    OnProgressData,
} from 'react-native-video';
import VideoModal from './videoModal'

interface User {
    name: string,
    email: string,
    stream_key: string,
}

interface Videos {
    _id: string,
    title: string,
    date: string,
    url : string,
    conference_id: string,
    thumbnail: string,
    duration: number,
    user: {
        name: string,
        photo: string
    }
}


const Thumbnails = () => {

    const [liveStreams, setLiveStreams] = useState<User[]>([{
        name: '',
        email: '',
        stream_key: ''
    }])

    const [videos, SetVideos] = useState<Videos[]>([])
    const [playVideo, SetPlayVideo] = useState(false)
    const [modalVisible, SetModalVisible] = useState(false)
    const [selectedItem, SetSelectedItem] = useState<Videos>()

    useEffect(() => {

        axios.get('http://192.168.1.7:8888/api/streams')
            .then(res => {
                console.log('live')
                console.log(res.data.data)
                let streams = res.data;

                if (typeof (streams['live'] !== 'undefined')) {
                    getStreamsInfo(streams['live']);
                }
            });
    }, [])

    useEffect(() => {
        axios.get('http://192.168.1.7:4000/videos').then(res => {

            const { data } = res
            console.log('video',data)
            SetVideos(data)
        })
    }, [])


    const getStreamsInfo = (live_streams) => {
        axios.get('http://192.168.1.7:4000/streams/info', {
            params: {
                streams: live_streams
            }
        }).then(res => {
            console.log('info', res.data.data)
            console.log(res.data.data)
            setLiveStreams([{
                name: res.data.name,
                email: res.data.email,
                stream_key: res.data.stream_key
            }])
        });
    }

    const openModal = (item) => {
      
        console.log('modal', item)
        SetSelectedItem(item)
        SetModalVisible(true)
    }

    const closeModal = () => {
        console.log('close modal')
        SetSelectedItem(undefined)
        SetModalVisible(false)
    }



    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => openModal(item)}>
            <View>
                <Text>{item.title}</Text>
                <Text>{item.thumbnail}</Text>
                <Image style={styles.logo} source={{ uri: item.thumbnail }} />
            </View>
        </TouchableOpacity>
    );

    return (

        <>

            <VideoAndroid video_url='http://192.168.1.7:8888/live/ssscscsdishiohoo/index.m3u8'/>
            <FlatList
                keyExtractor={(item) => item._id}
                data={videos}
                renderItem={renderItem}
            />

            {modalVisible ?
                
                <><VideoAndroid video_url={selectedItem?.url} />
                    {/* <VideoModal modalVisible={modalVisible} selectedItem={selectedItem} onClose={closeModal} /> */}
                </> :
                null
            }



        </>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: 200,
        width: 200
    },

})
export default Thumbnails