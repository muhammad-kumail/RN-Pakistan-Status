import { View, Text ,Image, SafeAreaView} from 'react-native'
import React,{useEffect} from 'react'
import images from '../../assets/images/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
const Splash: React.FC<any> =  ({navigation}) => {
    useEffect(()=>{
        const timer = setTimeout(() => {
            navigation.navigate('Splash2'); 
          }, 2000);
      
          return () => clearTimeout(timer);
    })
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#121212',justifyContent:'center',alignItems:'center'}}>
     <Image source={images.logo} style={{height:wp(30),width:wp(30)}}/>
    </SafeAreaView>
  )
}

export default Splash