import { View, Text ,Image} from 'react-native'
import React,{useEffect} from 'react'
import images from '../../assets/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
const Splash: React.FC<any> =  ({navigation}) => {
    useEffect(()=>{
        const timer = setTimeout(() => {
            navigation.navigate('splash2'); 
          }, 2000);
      
          return () => clearTimeout(timer);
    })
  return (
    <View style={{backgroundColor:'#595959',height:hp(100),justifyContent:'center',alignItems:'center'}}>
    <Image source={images.logo} style={{height:wp(30),width:wp(30)}}/>
    </View>
  )
}

export default Splash