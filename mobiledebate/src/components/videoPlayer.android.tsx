import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import { FullscreenClose, FullscreenOpen } from '../../assets/icons';

import { PlayerControls } from './playerControls.android';
import { ProgressBar } from './progressBar';
import axios from 'axios'

interface State {
  fullscreen: boolean;
  play: boolean;
  currentTime: number;
  duration: number;
  showControls: boolean;
}

interface props {
  video_url : any;
}

const VideoAndroid : React.FC<props> = ({video_url}) => {


  const videoRef = React.createRef<Video>();
  const [state, setState] = useState<State>({
    fullscreen: false,
    play: true,
    currentTime: 0,
    duration: 0,
    showControls: true,
  });

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);

    axios.get('http://192.168.43.147:8888/api/streams')
    .then(data => console.log(data.data))
    .catch(err => console.log('hii' , err))

    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);



  const onBuffer = () => {
    console.log('bufferning')
  }

  const load = () => {
    console.log('load start')
  }

  return (


      
      <TouchableWithoutFeedback onPress={showControls}>
        <View>
          <Video
            ref={videoRef}
            source={{
              uri:
                video_url,
            }}
            style={state.fullscreen ? styles.fullscreenVideo : styles.video}
            controls={false}
            resizeMode={'contain'}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={onEnd}
            paused={!state.play} 
          />
          {state.showControls && (
            <View style={styles.controlOverlay}>
              <TouchableOpacity
                onPress={handleFullscreen}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.fullscreenButton}>
                {state.fullscreen ? <FullscreenClose /> : <FullscreenOpen />}
              </TouchableOpacity>
              <PlayerControls
                onPlay={handlePlayPause}
                onPause={handlePlayPause}
                playing={state.play}
                showPreviousAndNext={false}
                showSkip={true}
                skipBackwards={skipBackward}
                skipForwards={skipForward}
              />

              <ProgressBar
                currentTime={state.currentTime}
                duration={state.duration > 0 ? state.duration : 0}
                onSlideStart={handlePlayPause}
                onSlideComplete={handlePlayPause}
                onSlideCapture={onSeek}
              />

            </View>
          )}
        </View>
      </TouchableWithoutFeedback >
      

    /* 

   {playVidoe == false ?
     <TouchableOpacity onPress={startVideo}>

       <Image source={{
         uri: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'
       }} style={styles.logo} />

     </TouchableOpacity> :

     <VideoPlayer
       source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
       ref={(ref) => {
         // console.log(ref)
         setData(ref)
       }}
       style={styles.backgroundVideo}
       onBuffer={onBuffer}                // Callback when remote video is buffering
       onError={videoError}               // Callback when video cannot be loaded
       fullscreen={true}
       resizeMode="contain"
     />

   } */

    // <View style={styles.container}>
    //   <TouchableWithoutFeedback onPress={showControls}>
    //     <View >
    //       <Video
    //         ref={videoRef}
    //         source={{
    //           uri:
    //             'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //         }}
    //         style={state.fullscreen ? styles.fullscreenVideo : styles.video}
    //         controls={false}
    //         resizeMode={'contain'}
    //         onLoad={onLoadEnd}
    //         onProgress={onProgress}
    //         onEnd={onEnd}
    //         paused={!state.play}
    //       //disableFullscreen={true}
    //       //disablePlayPause = {true}
    //       //disableVolume = 
    //       />
    //       {state.showControls && (
    //         <View style={styles.controlOverlay}>
    //           <TouchableOpacity
    //             onPress={handleFullscreen}
    //             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    //             style={styles.fullscreenButton}>
    //             {state.fullscreen ? <FullscreenClose /> : <FullscreenOpen />}
    //           </TouchableOpacity>
    //           <PlayerControls
    //             onPlay={handlePlayPause}
    //             onPause={handlePlayPause}
    //             playing={state.play}
    //             showPreviousAndNext={false}
    //             showSkip={true}
    //             skipBackwards={skipBackward}
    //             skipForwards={skipForward}
    //           />

    //           <ProgressBar
    //             currentTime={state.currentTime}
    //             duration={state.duration > 0 ? state.duration : 0}
    //             onSlideStart={handlePlayPause}
    //             onSlideComplete={handlePlayPause}
    //             onSlideCapture={onSeek}
    //           />

    //         </View>
    //       )}
    //     </View>
    //   </TouchableWithoutFeedback >
    // </View>
  );



  function handleOrientation(orientation: string) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (setState(s => ({ ...s, fullscreen: true })), StatusBar.setHidden(true))
      : (setState(s => ({ ...s, fullscreen: false })),
        StatusBar.setHidden(false));
  }

  function handleFullscreen() {
    state.fullscreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
  }

  function onLoadEnd(data: OnLoadData) {
    setState(s => ({
      ...s,
      duration: data.duration,
      currentTime: data.currentTime,
    }));
  }

  function onProgress(data: OnProgressData) {
    setState(s => ({
      ...s,
      currentTime: data.currentTime,
    }));
  }

  function onEnd() {
    setState({ ...state, play: false });
    videoRef.current.seek(0);
  }

  function showControls() {
    state.showControls
      ? setState({ ...state, showControls: false })
      : setState({ ...state, showControls: true });
  }

  function handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (state.play) {
      setState({ ...state, play: false, showControls: true });
      return;
    }

    setState({ ...state, play: true });
    setTimeout(() => setState(s => ({ ...s, showControls: false })), 2000);
  }

  function skipBackward() {
    videoRef.current.seek(state.currentTime - 10);
    setState({ ...state, currentTime: state.currentTime - 10 });
  }

  function skipForward() {
    videoRef.current.seek(state.currentTime + 10);
    setState({ ...state, currentTime: state.currentTime + 10 });
  }

  function onSeek(data: OnSeekData) {
    videoRef.current.seek(data.seekTime);
    setState({ ...state, currentTime: data.seekTime });
  }

};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  video: {
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },

  logo: {
    height: 200
  }

});

export default VideoAndroid
