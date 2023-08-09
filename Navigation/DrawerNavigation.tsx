import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../src/screens/Home';
import About from '../src/screens/About';
import CustomDrawerContent from './CustomDrawerContent';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../src/screens/Splash';
import DrawerMenu from './DrawerMenu';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  // const drawerContentOptions: DrawerContentOptions = {
  //   activeTintColor: 'blue', // Change to your desired color
  // };
  // function StackNav() {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="Splash"
  //         options={{
  //           headerShown: false
  //         }}
  //         component={Splash} />
  //     </Stack.Navigator>
  //   );
  // }
  // function DrawerNav()  {
  //   return (
  //     <Drawer.Navigator initialRouteName="Home"
  //       drawerContent={props => <CustomDrawerContent {...props} />}
  //     >
  //       <Drawer.Screen name="Home" component={Home}
  //         options={{ headerShown: false }}
  //       />
  //       <Drawer.Screen name="About" component={About} />
  //     </Drawer.Navigator>
  //   )
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen
      name='splash'component={Splash} options={{ headerShown: false }}
      />
       <Stack.Screen name="HamburgerMenu" component={DrawerMenu} />
      </Stack.Navigator>
      {/* <DrawerMenu /> */}

      {/* <Drawer.Navigator initialRouteName="Home"
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={Home}
                options={{ headerShown: false }}
            />
        </Drawer.Navigator> */}
    </NavigationContainer>
  );
};

export default DrawerNavigator;