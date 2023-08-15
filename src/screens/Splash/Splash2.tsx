import { View, Text, Image, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fonts from '../../assets/fonts/fonts';
const Splash2: React.FC<any> = ({ navigation }) => {
    // useEffect(()=>{
    //     const timer = setTimeout(() => {
    //         navigation.navigate('HamburgerMenu'); 
    //       }, 2000);

    //       return () => clearTimeout(timer);
    // })
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={images.splash2Img} style={{ height: hp(100), width: wp(100) }} >
                <View style={{position:'absolute', bottom:hp(10), width:wp(100), alignItems:'center'}}>
                    <Text style={{fontSize:wp(5), fontFamily:fonts.medium, color:"#FFFFFF"}}>Best Whatsapp Status</Text>
                    <TouchableOpacity onPress={() => {navigation.navigate("Home")}}>
                        <Text style={{color:'white',
                         fontFamily:fonts.medium, 
                         fontSize:wp(4), paddingHorizontal:wp(13), paddingVertical:wp(2.5), borderRadius:wp(5), marginTop:hp(2.5), backgroundColor:'#B036C1'}}>Let's go</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Splash2