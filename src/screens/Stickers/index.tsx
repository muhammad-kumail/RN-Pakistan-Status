import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Alert, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import images from '../../assets/images/images';
import Share from 'react-native-share';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header/Header';
import RNFS from 'react-native-fs'; // Import react-native-fs
import { request } from 'react-native-permissions';
import { getData } from '../../api/Httpservice';
import Config from '../../utils/config';
import { Linking } from 'react-native';
const Stickers: React.FC<any> = ({ navigation }) => {
  // const data = [
  //   {
  //     id: 1,
  //     img: images.splash2Img,
  //   },
  //   {
  //     id: 2,
  //     img: images.catcover,
  //   },
  //   {
  //     id: 3,
  //     img: images.catcover,
  //   },
  //   {
  //     id: 4,
  //     img: images.splash2Img,
  //   },
  //   {
  //     id: 5,
  //     img: images.splash2Img,
  //   },
  //   {
  //     id: 6,
  //     img: images.catcover,
  //   },
  //   {
  //     id: 7,
  //     img: images.catcover,
  //   },
  //   {
  //     id: 8,
  //     img: images.splash2Img,
  //   },
  //   {
  //     id: 9,
  //     img: images.splash2Img,
  //   },
  //   {
  //     id: 10,
  //     img: images.catcover,
  //   },
  //   {
  //     id: 11,
  //     img: images.catcover,
  //   },
  // ];
  const [data, setData] = useState([]);
  useEffect(() => {
    getStickersData()
  }, [])

  const getStickersData = async () => {

    await getData('getStickers').then((res) => {
      setData(res.data)
      console.log("My Images data", res)
    }).catch((error) => {
      console.log("Error", error.message)
    })
  }
  const downloadImage = async (imageUrl: string) => {

    try {
      const permissionStatus = await request('android.permission.WRITE_EXTERNAL_STORAGE');

      if (permissionStatus === 'granted') {

        const downloadDir = RNFS.DownloadDirectoryPath;
        const filename = `downloaded-image-${Date.now()}.jpg`;
        const filePath = `${downloadDir}/${filename}`;

        try {
          const response = await RNFS.downloadFile({
            fromUrl: imageUrl,
            toFile: filePath,
          });

          if (response) {
            console.log('Image downloaded to:', filePath);
            Alert.alert('Image downloaded successfully!');
          } else {
            console.error('Image download failed with status:', response);
            Alert.alert('Image download failed!');
          }
        } catch (error) {
          console.error('Error downloading image:', error);
          Alert.alert('Error downloading image!');
        }
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };
  const shareImageOnWhatsApp = async (url: any) => {
    try {
      const permissionStatus = await request('android.permission.WRITE_EXTERNAL_STORAGE');

      if (permissionStatus === 'granted') {

        const downloadDir = RNFS.DownloadDirectoryPath;
        const filename = `downloaded-image-${Date.now()}.jpg`;
        const filePath = `${downloadDir}/${filename}`;

        try {
          const response = await RNFS.downloadFile({
            fromUrl: url,
            toFile: filePath,
          });

          if (response) {
            console.log('Image downloaded to:', filePath);
            try {
              const image = filePath; // Replace with the actual path to your image
              const shareOptions = {
                title: 'Share via WhatsApp',
                url: `file://${image}`,
                failOnCancel: false,
                showAppsToView: ['whatsapp'],
                social: Share.Social.WHATSAPP,
              };
              console.log(shareOptions.url, "----")

              // await Share.open(shareOptions);
              await Share.shareSingle(shareOptions);
            } catch (error) {
              console.error('Error sharing image on WhatsApp:', error.message);
            }
            Alert.alert('Image downloaded successfully!');
          } else {
            console.error('Image download failed with status:', response);
            Alert.alert('Image download failed!');
          }
        } catch (error) {
          console.error('Error downloading image:', error);
          Alert.alert('Error downloading image!');
        }
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }

    // const whatsappUrl = 'whatsapp://';
    // // Attempt to open WhatsApp
    // Linking.canOpenURL(whatsappUrl).then((supported) => {
    //     if (supported) {
    //         return Linking.openURL(whatsappUrl);
    //     } else {
    //         console.error("WhatsApp is not installed on this device.");
    //     }
    // }).catch((error) => {
    //     console.error("Error opening WhatsApp:", error);
    // });

  };
  const numColumns = 2;
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#121212' }}>
      <Header
        title="Stickers"
        leftIcon={images.back}
        leftIconPress={() => navigation.goBack()}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        numColumns={numColumns}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => {
          return (
            <View style={[styles.card, { width: wp(45), height: hp(20), marginLeft: wp(1) }]}>
              <View style={{ height: hp(16) }}>
                <Image source={{ uri: `${Config.BASE_URL}${item?.imgUrl}` }} style={styles.image} />
              </View>
              <View style={{ height: hp(4), backgroundColor: 'red', flexDirection: 'row' }}>
                <TouchableOpacity style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', }} onPress={() => downloadImage(`${Config.BASE_URL}${item?.imgUrl}`)}>
                  <Image source={images.downarrow} style={{ height: hp(2), width: wp(4) }} resizeMode='contain' />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', }} onPress={() => shareImageOnWhatsApp(`${Config.BASE_URL}${item?.imgUrl}`)}>
                  <Image source={images.whatsapp} style={{ height: hp(2), width: wp(4) }} resizeMode='contain' />
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
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#333',
    borderRadius: wp(4),
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: hp(1),
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
