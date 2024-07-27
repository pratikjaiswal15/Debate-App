import AsyncStorage from '@react-native-community/async-storage';

export const setItem = async (key: string, value: string): Promise<any> => {

    if (value == null || value == undefined) {
        console.log("dont'do")
    }
    else {
        try {
            await AsyncStorage.setItem(key, value)
            console.log('set string in storage: ', value);
            return true;

        } catch (e) {
            // saving error
            console.log(e)
            return false;
        }
    }

}


export const setObject = async (key: string, value: any): Promise<any> => {
    try {
        if (value == null || value == '') {
            console.log("dont'do")
        } const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
        return jsonValue
    } catch (e) {
        // saving error
        console.log(e)
        return null
    }
}


export const getItem = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            // value previously stored
            return value
        }
    } catch (e) {
        // error reading value
        console.log(e)
        return null
    }
}


export const getObject = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.log(e)
        return null;
    }
}

const removeItem = async (key: string): Promise<any> => {
    try {
        await AsyncStorage.removeItem(key)

    } catch (e) {
        // remove error
        console.log(e)
    }

    console.log('Done.')
}


export const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // clear error
    }

    console.log('Done.')
}

