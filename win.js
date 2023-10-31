import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Winner = ({ route, navigation }) => {
    const [levelno, setLevelNo] = useState()
    const text = {

        fontSize: 30,
        color: '#3f37c9',
        fontStyle: 'italic',
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingTop: 50,
        width: '100%',
        textAlign: "center",

    }

    const textset = {

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',

    }

    const text1 = {

        fontSize: 25,
        width: '100%',
        padding: 5,
        margin: 5,
        color: 'black',
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignSelf: 'center',
        textAlign: 'center',
        borderWidth: 3,
        borderRadius: 15,
        backgroundColor: '#ced4da'
    }

    const share = {

        fontSize: 30,
        color: '#3f37c9',
        fontWeight: 'bold',
        alignSelf: 'center',

    }

    const shareimg = {

        width: 40,
        height: 40,
        color: 'black',
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: '#ced4da'

    }
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@levelno')
            if (value !== null) {
                // console.log("LevelNo =", value)
                // value previously stored
                setLevelNo(value)
            }
        } catch (e) {
            // error reading value
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (

        <>
            <ImageBackground resizeMode="stretch" source={require('./images/background.jpg')} style={{ height: '100%' }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1.5 }}>
                        <Text style={text}>Puzzle {levelno - 1} Completed</Text>
                    </View>
                    <View style={{ flex: 3, width: 200 }}>
                        <View style={{ flex: 1, alignSelf: 'center' }}>
                            <ImageBackground resizeMode="stretch" source={require('./images/trophy.png')} style={{ height: '100%', width: '100%', backgroundColor: 'pink' }}></ImageBackground>
                        </View>
                    </View>
                    <View style={{ flex: 3 }}>
                        <View style={textset}>
                            <Pressable style={{ width: '45%' }}><Text style={text1} onPress={() => { navigation.navigate("Puzzle") }}>Continue</Text></Pressable>
                            <Pressable style={{ width: '45%' }}><Text style={text1} onPress={() => { navigation.navigate("Home") }}>Main Menu</Text></Pressable>
                            <Pressable style={{ width: '45%' }}><Text style={text1} >Buy Pro</Text></Pressable>
                        </View>
                    </View>
                    <View style={{ flex: 3 }}>
                        <View style={{ flex: 1.5 }}>
                            <Text style={share}>Share This Puzzle</Text>
                            <Pressable style={shareimg}><ImageBackground source={require('./images/shareus.png')} style={{ height: 25, width: 25, alignSelf: 'center', margin: 6 }} ></ImageBackground></Pressable>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </>

    )

}

export default Winner;