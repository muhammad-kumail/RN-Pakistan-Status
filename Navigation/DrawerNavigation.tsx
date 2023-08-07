import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../src/screens/Home';
import About from '../src/screens/About';
import CustomDrawerContent from './CustomDrawerContent';


const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  // const drawerContentOptions: DrawerContentOptions = {
  //   activeTintColor: 'blue', // Change to your desired color
  // };
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" 
      drawerContent={props => <CustomDrawerContent {...props} />}
      >

        <Drawer.Screen name="Home" component={Home} 
        // options={{headerShown:false}}
        />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;