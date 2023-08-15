import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { RouteProp } from '@react-navigation/native';
// import { BottomTabParamList } from './types';
import { ImageSourcePropType } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../src/screens/Home';
import { View } from 'react-native';
import { Image } from 'react-native';
import { Text } from 'react-native';
import images from '../src/assets/images/images';
import ForYou from '../src/screens/ForYouScreen';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
type Screen1RouteProp = RouteProp<TabNavigationParamList>;
// type Screen2RouteProp = RouteProp<TabNavigationParamList, 'Screen2'>;
// type Screen3RouteProp = RouteProp<TabNavigationParamList, 'Screen3'>;

export type TabNavigationParamList = {
    Screen1: undefined;
    //   Screen2: undefined;
    //   Screen3: undefined;
};
const Tab = createBottomTabNavigator();

type BottomNavigationRouteProp = RouteProp<TabNavigationParamList, keyof TabNavigationParamList>;

interface BottomNavigationProps {
    navigation: BottomTabNavigationProp<TabNavigationParamList>;
    route:BottomNavigationRouteProp;
}
interface route {
    color: any;
    size: any;
    
    // icon:any
}
const BottomNavigation: React.FC<BottomNavigationProps> = ({ route }) => {
    return (
        <Tab.Navigator
        tabBarOptions={{
            style: {
                backgroundColor: 'white',
                height: 64, // Set your desired height here
              },
        }}
            screenOptions={({ route }) => ({
            
                tabBarIcon: ({ size, color }) => {
                    let iconName: string = '';
                    let icon: any;
                    // let icon:'';
                    if (route.name === 'Home') {
                        icon = images.homeIcon;
                        iconName = 'Home';
                    } else if (route.name === 'ForYou') {
                        icon = images.forYouIcon;
                        iconName = 'ForYou';
                    } else if (route.name === 'Audio') {
                        icon = images.audioIcon;
                        iconName = 'Audio';
                    }
                    return (
                        <View style={{ flexDirection: 'column', }}>
                            <View>
                                <Image style={{ height: wp(5), width: wp(5), alignSelf: 'center' }} source={icon} />
                            </View>
                            <View>
                                <Text style={{ color: 'black', fontSize: 12 }}>{iconName}</Text>
                            </View>
                        </View>);
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
                // tabBarActiveBackgroundColor: '#B036C1',
                // tabBarInactiveBackgroundColor:'#B036C1',
                headerShown: false,
                tabBarStyle: {
                    paddingVertical: 2,
                    height: hp(10),
                    backgroundColor:'#B036C1',
                    borderRadius:50
                  }

            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="ForYou" component={ForYou} />
            <Tab.Screen name="Audio" component={Home} />

        </Tab.Navigator>
    );
};

export default BottomNavigation;
