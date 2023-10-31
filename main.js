import React, { useState } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";

const Home = ({ route, navigation }) => {

  const head = {

    fontSize: 35,
    color: 'blue',
    fontStyle: 'italic',
    fontWeight: 'bold',
    flex: 1,
    alignSelf: 'center',
    paddingTop: 40,

  }

  const text = {

    fontSize: 30,
    color: 'white',
    padding: 10,

  }

  const textset = {

    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  }

  const share = {

    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center',

  }
  return (
    <>
      <ImageBackground source={require('./images/background.jpg')} style={{ height: '100%' }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 1 }}>

            <Text style={head}>math Puzzle</Text>

          </View>
          <View style={{ flex: 6, width: '100%', paddingRight: 15, paddingLeft: 15 }}>
            <ImageBackground resizeMode='stretch' source={require('./images/blackboard_main_menu.png')} style={{ height: '100%' }}>
              <View style={textset}>
                <Pressable><Text style={text} onPress={() => { navigation.navigate("Puzzle") }}>Continue</Text></Pressable>
                <Pressable><Text style={text} onPress={() => { navigation.navigate("Levels") }}>Puzzles</Text></Pressable>
                <Pressable><Text style={text}>Buy Pro</Text></Pressable>
              </View>
            </ImageBackground>
          </View>
          <View style={{ flex: 1, flexDirection: 'row'}}>
            
          </View>
        </View>
      </ImageBackground>
    </>
  )
}
export default Home;