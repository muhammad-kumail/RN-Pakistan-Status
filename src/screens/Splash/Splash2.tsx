import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Splash2: React.FC<any> = ({ navigation }) => {
    // useEffect(()=>{
    //     const timer = setTimeout(() => {
    //         navigation.navigate('HamburgerMenu'); 
    //       }, 2000);

    //       return () => clearTimeout(timer);
    // })
    return (
        <View>
            <Image source={images.splash2Img} style={{ height: hp(100), width: wp(100) }} />
            <TouchableOpacity>
                <Text>Lets Go</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Splash2