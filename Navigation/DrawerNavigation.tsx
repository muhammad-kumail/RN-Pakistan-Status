import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../src/screens/Home/index';
import About from '../src/screens/About';
import CustomDrawerContent from './CustomDrawerContent';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../src/screens/Splash';
import DrawerMenu from './DrawerMenu';
import Splash2 from '../src/screens/Splash/Splash2';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen
      name='splash'component={Splash} options={{ headerShown: false }}
      />
      <Stack.Screen
      name='splash2'component={Splash2} options={{ headerShown: false }}
      />
       {/* <Stack.Screen name="HamburgerMenu" component={DrawerMenu} /> */}
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default DrawerNavigator;