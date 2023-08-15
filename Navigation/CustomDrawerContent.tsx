import React from 'react';
import { View, Text, Button, Image, ImageBackground } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
// import { Image } from 'react-native-reanimated/lib/typescript/Animated';
import images from '../src/assets/images/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// const  logo= require('../src/assets/play-button.png')
const CustomDrawerContent: React.FC<any> = ({ navigation }) => {

  return (

    <DrawerContentScrollView  >
      {/* <DrawerItemList> */}
      <ImageBackground source={images.background} style={{
        // marginVertical: 0,
        // width: wp(85),
        height: hp(38), bottom: hp(1),
        flexDirection: 'column'
      }}
        borderBottomLeftRadius={wp(6)}
        borderBottomRightRadius={wp(6)}
      >
        <DrawerItem style={{marginLeft: wp(5)}}

          icon={() => (
            <Image
              source={images.logo}
              style={{ width: wp(15), height:wp(15), marginTop: hp(12) }}
            />
          )}
          label=""
          onPress={() => navigation.navigate("Home")}
        />
        <Text style={{ color: 'white', fontSize: 18, fontWeight: "bold",marginLeft: wp(5) }}>Best Whatsapp Status</Text>

      </ImageBackground>
      <DrawerItem
        style={{
          marginVertical: 0, height: hp(5)
        }}
        label={"Home"}
        onPress={() => navigation.navigate("Home")}
        labelStyle={{ color: 'black', fontSize: 14, height: 14, lineHeight: 14 }}
        pressColor="#7DE17C"
      />
      <DrawerItem
        style={{
          marginVertical: 0, height: hp(5)
        }}
        label={"Top Status"}
        onPress={() => navigation.navigate("Home")}
        labelStyle={{ color: 'black', fontSize: 14, height: 14, lineHeight: 14 }}
        pressColor="#7DE17C"
      />
      <DrawerItem
        style={{
          marginVertical: 0, height: hp(5)
        }}
        label={"View Status"}
        onPress={() => navigation.navigate("Home")}
        labelStyle={{ color: 'black', fontSize: 14, height: 14, lineHeight: 14 }}
        pressColor="#7DE17C"
      />
      <DrawerItem
        style={{
          marginVertical: 0, height: hp(5)
        }}
        label={"Hindi"}
        onPress={() => navigation.navigate("Home")}
        labelStyle={{ color: 'black', fontSize: 14, height: 14, lineHeight: 14 }}
        pressColor="#7DE17C"
      />
      <DrawerItem
        style={{
          marginVertical: 0, height: hp(5)
        }}
        label={"Punjabi"}
        onPress={() => navigation.navigate("Home")}
        labelStyle={{ color: 'black', fontSize: 14, height: 14, lineHeight: 14 }}
        pressColor="#7DE17C"
      />
      <DrawerItem
        style={{
          marginVertical: 0, height: hp(5)
        }}
        label={"Video Status"}
        onPress={() => navigation.navigate("Home")}
        labelStyle={{ color: 'black', fontSize: 14, height: 14, lineHeight: 14 }}
        pressColor="#7DE17C"
      />
      <DrawerItem
        style={{
          marginVertical: 0, height: hp(5)
        }}
        label={"More Categories"}
        onPress={() => navigation.navigate("Home")}
        labelStyle={{ color: 'black', fontSize: 14, height: 14, lineHeight: 14 }}
        pressColor="#7DE17C"
      />
      {/* </DrawerItemList> */}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;