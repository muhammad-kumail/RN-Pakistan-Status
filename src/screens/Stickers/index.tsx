import React from 'react';
import { View, SafeAreaView, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import images from '../../assets/images/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header/Header';

const Stickers: React.FC<any> = ({ navigation }) => {
  const data = [
    {
      id: 1,
      img: images.splash2Img,
    },
    {
      id: 2,
      img: images.splash2Img,
    },
    {
      id: 3,
      img: images.splash2Img,
    },
    {
      id: 4,
      img: images.splash2Img,
    },
    {
      id: 5,
      img: images.splash2Img,
    },
  ];

  const numColumns = 2;
  const screenWidth = Dimensions.get('window').width;
  // const cardWidth = screenWidth / numColumns;
  // const cardHeight = cardWidth * (4 / 3); // Assuming a 4:3 aspect ratio for cards

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#121212'}}>
      <Header 
        title="Stickers"
        leftIcon={images.back}  
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => {
          return (
            <View style={[styles.card, { width: wp(45), height: hp(20), marginLeft:wp(2) }]}>
              <View style={{height:hp(16)}}>
                <Image source={item.img} style={styles.image} />
              </View>
              <View style={{height:hp(4), backgroundColor:'red', flexDirection:'row'}}>
                <TouchableOpacity style={{flex:0.5 ,alignItems:'center', justifyContent:'center',}} onPress={()=> alert(`download press , ${item?.id}`)}>
                  <Image source={images.downarrow}  style={{height:hp(2.5), width:wp(6)}} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:0.5 ,alignItems:'center', justifyContent:'center',}} onPress={()=> alert(`whatapp press , ${item?.id}` , )}>
                  <Image source={images.whatsapp}  style={{height:hp(2.5), width:wp(6)}} resizeMode='contain'/>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Stickers;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#333',
    borderRadius: wp(4),
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: hp(1),
    overflow:'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
