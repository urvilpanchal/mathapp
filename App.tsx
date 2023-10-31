import React from 'react';
import Home from './main';
import Puzzle from './puzle';
import Levels from './level';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Winner from './win';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <>

      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Puzzle" component={Puzzle} />
          <Stack.Screen name="Levels" component={Levels} />
          <Stack.Screen name="Winner" component={Winner} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App;
