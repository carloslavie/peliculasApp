import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';

const Stack = createStackNavigator();

export const Navigation = ()=> {
  return (
    <Stack.Navigator
      // initialRouteName=''
      screenOptions={{
        // headerShown:false,
        headerStyle:{
          elevation: 0,
        },
        cardStyle:{
          backgroundColor:'white',
        },
        headerShown:false,
    }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};
