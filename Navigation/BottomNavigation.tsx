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
import Audios from '../src/screens/Audios';
import { useSelector } from 'react-redux';
import {AppState} from "../Redux/Reducer/Reducer"
type Screen1RouteProp = RouteProp<TabNavigationParamList>;

export type TabNavigationParamList = {
    Screen1: undefined;
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
    const data = useSelector((state: AppState) => state.app.bottomNavVisible);

//   const data= bottomNavVisible?.app?.bottomNavVisible;
  console.log(data, "====")
    return( 
        <Tab.Navigator
       
            screenOptions={({ route }) => ({
                
                tabBarIcon: ({ focused, size, color }) => {
                    
                    let iconName: string = '';
                    let icon: any;
                    // let icon:'';
                    if (route.name === 'Homee') {
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
                        <View style={{ flexDirection: 'column',alignItems:'center', width:wp(10), height:wp(5) }}>
                            <View>
                                <Image style={{ height: wp(5), width: wp(5), alignSelf: 'center', resizeMode:'contain' }} source={icon} />
                            </View>
                            <View>
                                <Text style={{ color: 'white', fontSize: wp(2.5) }}>{iconName}</Text>

                                {focused ?
                                <View style={{height:wp(0.5), backgroundColor:'white'}}></View>
                                    : null    }
                            </View>
                        </View>
                        );
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarLabel:'',
                tabBarStyle: {
                    borderColor:'#B036C1',
                    position:'absolute',
                    bottom:wp(3),
                    marginHorizontal:wp(4),                    
                    // paddingVertical: 2,
                    // justifyContent:'center',
                    // zIndex:1,
                    height: wp(13),
                    backgroundColor:'#B036C1',
                    borderRadius:50,
                    // display: data === true ? "none" : undefined
                  }

            })}
        >
            <Tab.Screen name="Homee" component={Home} />
            <Tab.Screen name="ForYou" component={ForYou} />
            <Tab.Screen 
                name="Audio" 
                component={Audios} 
                // options={{
                //     // tabBarStyle:{display: data? 'flex' : 'none' }
                //     // tabBarStyle:{display: data===false? 'none' : null}
                // }}
            />

        </Tab.Navigator>
       
    );
};

export default BottomNavigation;
