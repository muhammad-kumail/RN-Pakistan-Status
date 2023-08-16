import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../src/screens/Splash';
import Splash2 from '../src/screens/Splash/Splash2';
import CustomDrawerContent from './CustomDrawerContent';
import Home from '../src/screens/ForYouScreen/index';
import About from '../src/screens/About';
import BottomNavigation from './BottomNavigation';
import Stickers from '../src/screens/Stickers';
import ProfileImages from '../src/screens/ProfileImages';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// const DrawerMenu: React.FC = () => {
//   return (
//     <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="About" component={About} />
//     </Drawer.Navigator>
//   );
// };

const MyStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false }}>
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='Splash2' component={Splash2} />
        <Stack.Screen name='Stickers' component={Stickers} />
        <Stack.Screen name='ProfileImages' component={ProfileImages} />
        {/* <Stack.Screen name="DrawerMenu" component={DrawerMenu} /> */}
        <Stack.Screen name='Home' component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
