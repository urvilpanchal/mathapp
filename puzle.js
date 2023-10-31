import { View, Alert, Text, ImageBackground, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Puzzle = ({ route, navigation }) => {
    const [levelno, setLevelNo] = useState(1)
    const [Disp, setDisp] = useState('')
    const [Maxno, setMaxno] = useState(1)
    const [isRefreshed, setRefreshed] = useState(false)
    const [Skip, setSkip] = useState([])
    const allImages = [
        require('./images/p1.png'),
        require('./images/p2.png'),
        require('./images/p3.png'),
        require('./images/p4.png'),
        require('./images/p5.png'),
        require('./images/p6.png'),
        require('./images/p7.png'),
        require('./images/p8.png'),
        require('./images/p9.png'),
        require('./images/p10.png'),
        require('./images/p11.png'),
        require('./images/p12.png'),
        require('./images/p13.png'),
        require('./images/p14.png'),
        require('./images/p15.png'),
        require('./images/p16.png'),
        require('./images/p17.png'),
        require('./images/p18.png'),
        require('./images/p19.png'),
        require('./images/p20.png'),
        require('./images/p21.png'),
        require('./images/p22.png'),
        require('./images/p23.png'),
        require('./images/p24.png'),
    ]
    const trueAns = ["10", "25", "6", "14", "128", "7", "50", "1025", "100", "3", "212", "3011", "14", "16", "1", "2", "44", "45", "625", "1", "13", "47", "50", "34"];
    const Hint = ["Sum", "Multiple", "Divide", ""]

    const container = {
        height: '100%',
        width: '100%'
    }
    const submit = {
        height: "100%",
        width: "100%",
        color: "white",
        fontSize: 25,
        backgroundColor: 'black',
        paddingTop: 7,
        fontWeight: 'bold'
    }
    const num = {

        fontSize: 30,
        color: 'white',
        width: '9%',
        borderRadius: 7,
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'silver',
    }
    const num1 = {

        fontSize: 30,
        color: 'white',
        height: '100%',
        textAlign: 'center',

    }

    useFocusEffect(
        React.useCallback(() => {
            getData()
            getMaxNo()
            getSkipped();
            storeSkipped(Skip)
        }, [Maxno, Skip])
    );
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@levelno')
            if (value !== null) {
                setLevelNo(value)
                setRefreshed(true)
            }
        } catch (e) {
           
        }
    }

    function number(num) {

        setDisp(Disp + num)

    }

    function backspace() {

        setDisp(Disp.substring(0, Disp.length - 1))

    }
    function Submit() {

        if (Disp == trueAns[levelno - 1]) {
            if (Maxno <= levelno) {
                storeMaxNo(parseInt(levelno) + 1)
            }
            storeData(parseInt(levelno) + 1)

            navigation.navigate("Winner"),
                setDisp('')
        }

    }
    function skip() {
        setSkip([...Skip, levelno])

        if (Maxno <= levelno) {
            storeMaxNo(parseInt(levelno) + 1)
        }
        storeData(parseInt(levelno) + 1)
        navigation.navigate("Puzzle")
    }
    useEffect(() => {
        storeSkipped(Skip)
    }, [Skip])
    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@levelno', value.toString())

        } catch (e) {
            // saving error
        }
    }
    const getMaxNo = async () => {
        try {
            const value = await AsyncStorage.getItem('@maxno')
            if (value !== null) {

                getMaxNo(value)
                setRefreshed(true)
            }
        } catch (e) {
            // error reading value
        }
    }
    const storeMaxNo = async (value) => {
        try {
            await AsyncStorage.setItem('@maxno', value.toString())
        } catch (e) {
            // saving error
        }
    }
    const storeSkipped = async (value) => {
        try {

            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@skiplevel', jsonValue)
        } catch (e) {
            // saving error
        }
    }
    const getSkipped = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@skiplevel')
            // console.log("Json= ", jsonValue)
            setRefreshed(true)
            setSkip(JSON.parse(jsonValue));
        } catch (e) {
            // error reading value
        }
    }
    function hint() {

        Alert.alert("Hint", Hint[levelno - 1])
    }

    return (
        <>
            <ImageBackground source={require('./images/gameplaybackground.jpg')} resizeMode='stretch' style={container}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                    <View style={{ height: '9%', width: '100%', flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 10 }}>
                            <Pressable style={{ height: "100%", width: "100%", justifyContent: 'center' }} onPress={() => { skip() }}>
                                <ImageBackground source={require('./images/skip.png')} resizeMode='stretch' style={{ height: '75%', width: '70%' }}>
                                </ImageBackground>
                            </Pressable>
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', paddingTop: 10 }}>

                            <ImageBackground source={require('./images/level_board.png')} resizeMode='stretch' style={{ height: '90%', width: '100%', alignSelf: 'flex-start' }}>
                                <Text style={{ fontSize: 32, alignSelf: "center", fontWeight: 'bold', color: 'black' }}>Puzzle {levelno}</Text>
                            </ImageBackground>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Pressable style={{ height: "100%", width: "100%", justifyContent: 'center' }} onPress={() => { hint() }}>
                                <ImageBackground source={require('./images/hint.png')} resizeMode='stretch' style={{ height: '75%', width: '70%', alignSelf: 'flex-end' }}></ImageBackground>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ height: '45%', width: '100%', paddingLeft: 10, paddingRight: 10 }}>
                        <ImageBackground source={allImages[levelno - 1]} resizeMode='stretch' style={{ height: "100%" }}></ImageBackground>
                    </View>
                    <View style={{ height: '48%', width: '100%', flexDirection: 'column' }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 0.5 }}></View>
                        <View style={{ flex: 0.4, flexDirection: "row" }}>
                            <View style={{ flex: 2.5, backgroundColor: 'white' }}>
                                <Text style={{ fontSize: 30, fontFamily: 'century', color: 'black', padding: 8 }}>{Disp}</Text>
                            </View>
                            <View style={{ backgroundColor: 'black', flex: 1 }}>
                                <Pressable onPress={() => { backspace() }}>
                                    <ImageBackground source={require('./images/delete.png')} resizeMode='stretch' style={{ height: "100%", width: "80%" }}></ImageBackground>
                                </Pressable>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Pressable style={submit}><Text style={submit} onPress={()=>{Submit()}}>Submit</Text></Pressable>
                            </View>
                        </View>
                        <View style={{ flex: 0.3, flexDirection: "row", justifyContent: 'space-evenly', paddingBottom: 30 }}>
                            <Pressable style={num}><Text style={num1} onPress={() => { number('1') }}>1</Text></Pressable>
                            <Pressable style={num}><Text style={num1} onPress={() => { number('2') }}>2</Text></Pressable>
                            <Pressable style={num}><Text style={num1} onPress={() => { number('3') }}>3</Text></Pressable>
                            <Pressable style={num}><Text style={num1} onPress={() => { number('4') }}>4</Text></Pressable>
                            <Pressable style={num}><Text style={num1} onPress={() => { number('5') }}>5</Text></Pressable>
                            <Pressable style={num}><Text style={num1} onPress={() => { number('6') }}>6</Text></Pressable>
                            <Pressable style={num}><Text style={num1} onPress={() => { number('7') }}>7</Text></Pressable>
                            <Pressable style={num}><Text style={num1} onPress={() => { number('8') }}>8</Text></Pressable>
                            <Pressable style={num}><Text style={num1} onPress={() => { number('9') }}>9</Text></Pressable>
                            <Pressable style={num}><Text style={num1} onPress={() => { number('0') }}>0</Text></Pressable>
                        </View>
                    </View>
                </View>

            </ImageBackground >
        </>
    )
}

export default Puzzle