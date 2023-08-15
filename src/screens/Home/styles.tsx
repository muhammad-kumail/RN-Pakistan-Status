import { View, Text, Image, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Styles: React.FC<any> = ({ navigation }) => {
    // useEffect(()=>{
    //     const timer = setTimeout(() => {
    //         navigation.navigate('HamburgerMenu'); 
    //       }, 2000);

    //       return () => clearTimeout(timer);
    // })
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={images.splash2Img} style={{ height: hp(100), width: wp(100) }} >
                <TouchableOpacity>
                    <Text style={{color:'white', fontSize:12}}>Lets Go</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Styles