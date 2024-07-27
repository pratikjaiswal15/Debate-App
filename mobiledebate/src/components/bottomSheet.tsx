import * as React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, StatusBar, BackHandler } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

const {
    call,
    onChange
} = Animated;


const Bottom = () => {
    const [show, setshow] = React.useState(false)
    const [selected, setselected] = React.useState(null)
    const [miniPlayer, setMiniPlayer] = React.useState(false)
    const [openRatio, setopenRatio] = React.useState(1)

    const drawerCallbackNode = new Animated.Value(0);

    const onCallback : any = async ([value]) => {
        console.log(value)
        await setopenRatio(prev => 1 - value)
        console.log('hii',openRatio)
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                console.log(openRatio)
                // console.log(show)
                // console.log(selected)
                if (show) {
                    console.log('back')
                    setMiniPlayer(true)
                    sheetRef.current.snapTo(2)
                    return true;
                }
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [show, selected])
    );

    const closeSheet = () => {
        setshow(false)
        sheetRef.current.snapTo(1)
    }

    const renderContent = () => (
        <View
            style={{
                backgroundColor: 'white',
                padding: 16,
                height: 1000,
            }}
        >
            <Text>Swipe down to close</Text>
            <Text>item</Text>
            <Button title='close' onPress={closeSheet} />

        </View>
    );


    const sheetRef: any = React.useRef(null);

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];

    const showBottomSheet = async (item) => {
        console.log(item)
        await setshow(true)
        await setselected(item)
        console.log(show)
        console.log(selected)
        sheetRef.current.snapTo(0)
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => showBottomSheet(item)}>
            <Text>{item.title}</Text>
            <Text>{item.id}</Text>
        </TouchableOpacity>
    );


    return (
        <>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>



            <BottomSheet
                ref={sheetRef}
                snapPoints={[610, 0, 100]}
                renderContent={renderContent}
                initialSnap={1}
                onCloseStart={() => console.log('start')}
                callbackNode={drawerCallbackNode} 
                
            />


            <Animated.Code
                exec={onChange(
                    drawerCallbackNode,
                    call([drawerCallbackNode], onCallback))}
            />

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
})
export default Bottom