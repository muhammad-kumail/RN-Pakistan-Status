import React, { useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, PermissionsAndroid, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
// import VideoPlayer from 'react-native-video-controls'
import { getHomeVides } from '../../api/Httpservice';
import Config from '../../utils/config';
import images from '../../assets/images/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import fonts from '../../assets/fonts/fonts';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Share from 'react-native-share';
import SendIntent from 'react-native-send-intent';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface Item {
  id: string;
  content: string;
  color: any
}
interface VideoItem {
  _id: string;
  mediaUrl: string;
  colors: string
}
// const data: Item[] = [
//   { id: '1', content: 'Item 1 Content', color: '#FF5733' },
//   { id: '2', content: 'Item 2 Content', color: '#3498DB' },
//   { id: '3', content: 'Item 3 Content', color: '#27AE60' },
//   { id: '4', content: 'Item 1 Content', color: '#FF5733' },
//   { id: '5', content: 'Item 2 Content', color: '#3498DB' },
//   { id: '6', content: 'Item 3 Content', color: '#27AE60' },
//   // ... Add more items
// ];


const ForYou = () => {
  const [check, setCheck] = useState(false)
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(0)
  const [videoData, SetVideoData] = useState<VideoItem[]>([]);
  const [focusedVideo, setFocusedVideo] = useState<string | null>(null);
  const flatListRef = useRef<FlatList<VideoItem>>(null);
  const [img, setImg] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoDownloading, setVideoDownloading] = useState(false);
  var date = new Date()
  type AndroidPermissionType = keyof typeof PERMISSIONS.ANDROID;
  useEffect(() => {
    checkStoragePermission();
  }, []);

  const checkStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      console.log(granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (error) {
      console.error('Error requesting storage permission:', error);
    }
  };

  useEffect(() => {

    const videos = async () => {
      try {
        const response = await getHomeVides();
        SetVideoData(response?.data?.videoContents);
        console.log(response?.data)
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };
    videos();
  }, []);

  const renderItem = ({ item, index }: { item: VideoItem, index: any }) => {
    const clickPause = (mediaUrl: string) => {
      if (focusedVideo === mediaUrl) {
        setFocusedVideo(null);
        console.log("---", setFocusedVideo)
      } else {
        setFocusedVideo(mediaUrl);
      }
      console.log('Focused --->', mediaUrl);
    };
    const audioDownload = async () => {
      try {
        const permissionStatus = await PermissionsAndroid.request(
          // 'android.permission.WRITE_EXTERNAL_STORAGE'
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (permissionStatus === 'granted') {


          // if (videoDownloading) {
          //   console.log("Video download already in progress...");
          //   return;
          // }
          // setVideoDownloading(true);
          const videoUrl = Config.BASE_URL + item.mediaUrl;
          const downloadDir = RNFS.DownloadDirectoryPath;
          const filename = `downloaded-video-${Date.now()}.mp4`;
          const path = `${downloadDir}/${filename}`;
          // const path = RNFS.DocumentDirectoryPath + `/` + Math.floor(date.getTime() + date.getSeconds() / 2) + '.mp4';
          console.log("path is", path)

          await RNFetchBlob.config({
            fileCache: true,
            appendExt: 'mp4',
            path: path,
          }).fetch('GET', videoUrl)
            .then((res) => {
              console.log('Video downloaded to:', res.path());
              
            }
            )
            .catch((error) => {
              console.error('Error downloading video:', error);
            })
          //     try {
          //       const response = await RNFetchBlob.config({
          //         fileCache: true,
          //         appendExt: 'mp4',
          //         path: path,
          //       }).fetch('GET', videoUrl);

          //       console.log('Video downloaded to:', response.path());
          //     } catch (error) {
          //       console.error('Error downloading video:', error);
          //     } finally {
          //       setVideoDownloading(false); // Set to false when the download is complete or an error occurs
          //     }
        } else {
          console.log('Permission denied');
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
      // finally{
      //   setVideoDownloading(false)
      // }

      //   } else {
      //     console.log("Dir existss")
      //   }

    };
    const shareVideo = async () => {

      // const videoUrl = Config.BASE_URL + item.mediaUrl;

      // try {
      //   const video = videoUrl; // Replace with the actual path to your image
      //   const shareOptions = {
      //     title: 'Share',
      //     url: video,
      //     failOnCancel: false,
      //     showAppsToView: ['whatsapp'],
      //   };
      //   console.log(shareOptions.url, "----")

      //   await Share.open(shareOptions);
      // } catch (error) {
      //   console.error('Error sharing image on WhatsApp:', error.message);
      // }
      try {
        console.log("whtsapp---");
        const permissionStatus = await request('android.permission.WRITE_EXTERNAL_STORAGE');

        if (permissionStatus === 'granted') {
          const videoUrl = Config.BASE_URL + item.mediaUrl;
          const downloadDir = RNFS.DownloadDirectoryPath;
          const filename = `downloaded-video-${Date.now()}.mp4`;
          const path = `${downloadDir}/${filename}`;
          try {
            const response = await RNFS.downloadFile({
              fromUrl: videoUrl,
              toFile: path,
            });

            if (response) {
              console.log('Image downloaded to:', path);
              try {
                const video = path; // Replace with the actual path to your image
                const shareOptions = {
                  title: 'Share via WhatsApp',
                  url: `file://${video}`,
                  failOnCancel: false,
                  // social: Share.Social.WHATSAPP,
                  showAppsToView: ['whatsapp'],
                };
                console.log(shareOptions.url, "----")

                await Share.open(shareOptions);
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
    };
    const shareVideoOnWhatsApp = async () => {

      try {
        console.log("whtsapp---");
        const permissionStatus = await request('android.permission.WRITE_EXTERNAL_STORAGE');

        if (permissionStatus === 'granted') {
          const videoUrl = Config.BASE_URL + item.mediaUrl;
          const downloadDir = RNFS.DownloadDirectoryPath;
          const filename = `downloaded-video-${Date.now()}.mp4`;
          const path = `${downloadDir}/${filename}`;
          try {
            const response = await RNFS.downloadFile({
              fromUrl: videoUrl,
              toFile: path,
            });

            if (response) {
              console.log('Image downloaded to:', path);
              try {
                const video = path; // Replace with the actual path to your image
                const shareOptions = {
                  title: 'Share via WhatsApp',
                  url: `file://${video}`,
                  failOnCancel: false,
                  social: Share.Social.WHATSAPP,
                  showAppsToView: ['whatsapp'],
                };
                console.log(shareOptions.url, "----")

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
    
    };
    return (
      <View style={styles.item}>
        {img &&
          <TouchableOpacity style={{ zIndex: 1 }} onPress={() => {
            setCheck(!check);
            setImg(!img);
            console.log("check is ", check);

          }}>
            <Image source={images.playBtn} style={styles.playBtn} />
          </TouchableOpacity>
        }

        {videoLoading &&
          <ActivityIndicator
            // animating
            color={"grey"}
            size="large"
            style={{ flex: 1, zIndex: 1, position: "absolute", top: "50%", left: "45%" }}
          />
        }
        <TouchableOpacity onPress={() => audioDownload()} style={styles.downloadIcon}>
          <Image source={images.download} style={styles.iconSize} tintColor="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => shareVideoOnWhatsApp()} style={styles.whatsapp}>
          <Image source={images.whatsapp} style={styles.iconSize} tintColor="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => shareVideo()} style={styles.share}>
          <Image source={images.share} style={styles.iconSize} tintColor="#FFFFFF" />
        </TouchableOpacity>

        <TouchableWithoutFeedback
          onPress={
            () => {
              console.log("okkk");
              setCheck(!check);
              setImg(!img)
            }
          }
        >
          <Video
            style={styles.video}
            source={{ uri: (Config.BASE_URL + item.mediaUrl) }}
            paused={(visibleVideoIndex === index ? false : true) || (check)}
            repeat={true}
            resizeMode={'contain'}
            onLoad={(data) => {
              setVideoLoading(!data.canPlayFastForward)
            }}

          />

        </TouchableWithoutFeedback>
      </View>


      //   <Videoplayer
      //     source={{ uri: (Config.BASE_URL + item.mediaUrl) }}
      //     style={styles.video}
      //     playInBackground={false}
      //     playWhenInactive={true}
      //     paused={(visibleVideoIndex === index ? false : true) || (check)}
      //     repeat={true}
      //   />

    );
  };
  return (
    <SafeAreaView>
      <Text style={styles.forYouText}>For You</Text>
      <FlatList
        ref={flatListRef}
        data={videoData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          setCheck(false)
          setImg(false)
          const yOffset = event.nativeEvent.contentOffset.y;
          const currentIndex = Math.round(yOffset / screenHeight);
          setVisibleVideoIndex(currentIndex)
          flatListRef.current?.scrollToIndex({ animated: true, index: currentIndex });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    // flex: 1,
    height: screenHeight,
    justifyContent: 'center',
    // alignItems: 'center',
    // borderBottomWidth: 1,
    // borderColor: 'lightgray',
    // backgroundColor: 'red'
  },

  video: {
    // height: '100%',
    height: Dimensions.get("window").height,
    width: screenWidth,
    // zIndex:1
    // width: Dimensions.get('window').width,
    // height: correctHeight,
    backgroundColor: '#121212'
  },
  playBtn: {
    // flex:1,
    // backgroundColor: 'red',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    // left:0,
    alignSelf: 'center',
    marginTop: hp(45),
    // borderRadius: 50,
    height: wp(20),
    width: wp(20),
    // padding: 100
  },
  forYouText: {
    zIndex: 1,
    position: 'absolute',
    top: hp(3),
    alignSelf: 'center',
    color: 'white',
    fontFamily: fonts.medium,
    fontSize: 20,
  },
  downloadIcon: {
    zIndex: 1,
    position: 'absolute',
    right: wp(5),
    bottom: hp(25),
    // height:wp(6),
    // width:wp(6)
  },
  whatsapp: {
    zIndex: 1,
    position: 'absolute',
    right: wp(5),
    bottom: hp(35),
    // height:wp(6),
    // width:wp(6)
  },
  share: {
    zIndex: 1,
    position: 'absolute',
    right: wp(5),
    bottom: hp(15),
    // height:wp(6),
    // width:wp(6)
  },
  iconSize: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain'
  }
});

export default ForYou;
