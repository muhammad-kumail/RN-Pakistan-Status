import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../src/screens/ForYouScreen/index';
import About from '../src/screens/About';
import CustomDrawerContent from './CustomDrawerContent';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import splash from '../src/screens/Splash';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerMenu: React.FC = () => {
    return (
        <Drawer.Navigator initialRouteName="Home"
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={Home}
                options={{ headerShown: false }}
            />
            <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    );
};

export default DrawerMenu;