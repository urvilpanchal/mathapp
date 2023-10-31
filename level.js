import { View, Text, ImageBackground, ScrollView, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';

const Levels = ({ route, navigation }) => {

  const [levelno, SetLevelNo] = useState(1);
  const [Maxno, SetMaxNo] = useState(1);
  const levelary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

  const board = {

    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  }

  const num = {

    fontSize: 60,
    textAlign: 'center',
    height: '90%',
    width: '93%',
    borderWidth: 2,
    color: 'black',
    borderRadius: 15
  }

  const lock = {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  }

  const clickno = (no) => {
    storeno(no)
    navigation.navigate("Puzzle")
  }

  const storeno = async (value) => {
    try {
      await AsyncStorage.setItem('@levelno', value.toString())
    } catch (e) {
      // saving error
    }
  }

  const getno = async () => {
    try {
      const value = await AsyncStorage.getItem('@levelno')
      if (value !== null) {
        SetLevelNo(value)
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

  const getMaxNo = async () => {
    try {
      const value = await AsyncStorage.getItem('@maxno')
      if (value !== null) {
        SetMaxNo(value)
      }
    } catch (e) {
      // error reading value
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      //   const unsubscribe = API.subscribe(userId, user => setUser(user));
      getMaxNo()
      //   return () => unsubscribe();
    }, [Maxno])
  );

  return (
    <>
      <ImageBackground source={require('./images/background.jpg')} resizeMode='stretch' style={{ height: '100%', width: '100%' }}>
        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 0.5 }}>
              <Text style={board}>Select Puzzles</Text>
            </View>
            <View style={{ flex: 0.8, flexDirection: 'column' }}>
              <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                  levelary.map((item) => {
                    return (
                      item < Maxno ?
                        <Pressable style={lock} onPress={() => { clickno(item) }}>
                          <ImageBackground source={require('./images/tick.png')} style={{ height: '90%', width: '93%' }}>
                            <Text style={num}>{item}</Text>
                          </ImageBackground>
                        </Pressable>
                        :
                        item == Maxno ?
                          <Pressable style={lock} onPress={() => { clickno(item) }}>
                            <Text style={num}>{item}</Text>
                          </Pressable>
                          :
                          <Pressable style={lock} onPress={() => { clickno(item) }} disabled={true}>
                            <ImageBackground source={require('./images/lock.png')} style={{ height: '90%', width: '93%' }}>
                            </ImageBackground>
                          </Pressable>
                    )
                  })
                }
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  )
}

export default Levels;