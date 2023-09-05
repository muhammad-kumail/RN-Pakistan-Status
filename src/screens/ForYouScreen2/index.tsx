import React, { useRef, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  PermissionsAndroid, 
  Image, 
  Dimensions, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  ActivityIndicator, 
  SafeAreaView, 
  Alert,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
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
import CustomLoader from '../../components/CustomLoader/CustomLoader';

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
const ForYou2 = () => {
  const [check, setCheck] = useState(false)
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(0)
  const [videoData, SetVideoData] = useState<VideoItem[]>([]);
  const [focusedVideo, setFocusedVideo] = useState<string | null>(null);
  const flatListRef = useRef<FlatList<VideoItem>>(null);
  const [img, setImg] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoDownloading, setVideoDownloading] = useState(false);
  var date = new Date()
  // const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  // const [videoData, setVideoData] = useState<VideoItem[]>([]);
  // const [focusedVideo, setFocusedVideo] = useState<string | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  type AndroidPermissionType = keyof typeof PERMISSIONS.ANDROID;
  useEffect(() => {
    checkStoragePermission();
  }, []);

  const checkStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
      // console.log(granted);

        if (
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (error) {
      console.error('Error requesting storage permission:', error);
    }
  }
  };

  useEffect(() => {

    const videos = async () => {
      try {
        const response = await getHomeVides();
        SetVideoData(response?.data?.ranVideo);
        // console.log(response?.data)
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };
    videos();
  }, []);
  const playVideo = (index: number) => {
    setActiveVideoIndex(index);
    setFocusedVideo(videoData[index]?._id);
  };

  const pauseVideo = () => {
    setActiveVideoIndex(null);
    setFocusedVideo(null);
  };
  const renderItem = ({ item, index }: { item: VideoItem, index: any }) => {
    const isActive = activeVideoIndex === index;
    const isFocused = focusedVideo === item._id;
    const videoDownload = async () => {
      setVideoDownloading(true);
      try {
        const videoUrl =  item.mediaUrl;
        const downloadDir = RNFS.ExternalDirectoryPath;
        const filename = `downloaded-${Date.now()}.mp4`;
        const path = `${downloadDir}/${filename}`;

        console.log("Download path is", path);

        // Request write permission
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        if (
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          const response = await RNFS.downloadFile({
            fromUrl: videoUrl,
            toFile: path,
          });

          if (response) {
            console.log('response', response)
            setVideoDownloading(false);
            console.log('Video downloaded to:', path);
            Alert.alert('Downloaded', 'Video download successfully!');
          } else {
            setVideoDownloading(false);
            console.error('Video download failed with status code:', response.statusCode);
            Alert.alert('Video download failed!');
          }
        } else {
          setVideoDownloading(false);
          console.error('Storage permission denied');
          Alert.alert('Storage permission denied');
        }
      } catch (error) {
        setVideoDownloading(false);
        console.error('Error downloading video:', error);
        Alert.alert('Error downloading video!');
      }
    };

    //     const res = await RNFetchBlob.config({
    //       fileCache: true,
    //       appendExt: 'mp4',
    //       path: path,
    //     }).fetch('GET', videoUrl);
    //     setVideoDownloading(false)
    //     Alert.alert("Downloaded", "Video successfully downloaded");

    //   } catch (error) {
    //     setVideoDownloading(false)
    //     console.error('Error downloading video:', error);
    //   }
    // };
    const shareVideo = async () => {
      try {
        console.log("whtsapp---");
        const permissionStatus = await request('android.permission.WRITE_EXTERNAL_STORAGE');

        // if (permissionStatus === 'granted') {
        const videoUrl =  item.mediaUrl;
        const downloadDir = RNFS.ExternalDirectoryPath;
        const filename = `downloaded-video-${Date.now()}.mp4`;
        const path = `${downloadDir}/${filename}`;
        try {
          const response = RNFS.downloadFile({
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
              console.error('Error sharing image on WhatsApp:', error);
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
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    };
    const shareVideoOnWhatsApp = async () => {
      try {
        console.log("whtsapp---");
        const permissionStatus = await request('android.permission.WRITE_EXTERNAL_STORAGE');

        const videoUrl =  item.mediaUrl;
        const downloadDir = RNFS.ExternalDirectoryPath;
        const filename = `downloaded-${Date.now()}.mp4`;
        const path = `${downloadDir}/${filename}`;
        try {
          const response = RNFS.downloadFile({
            fromUrl: videoUrl,
            toFile: path,
          });

          if (response) {
            console.log('Video downloaded to:', path);
            try {
              const video = path; // Replace with the actual path to your image
              const shareOptions = {
                title: 'Share via WhatsApp',
                url: `file://${video}`,
                failOnCancel: false,
                social: Share.Social.WHATSAPP,
                showAppsToView: ['whatsapp'],
              };
              console.log(shareOptions, "----")

              await Share.shareSingle(shareOptions);
            } catch (error) {
              console.error('Error sharing image on WhatsApp:', error.message);
            }
            // Alert.alert('Image downloaded successfully!');
          } else {
            console.error('Image download failed with status:', response);
            Alert.alert('Image download failed!');
          }
        } catch (error) {
          console.error('Error downloading image:', error);
          Alert.alert('Error downloading image!');
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }

    };
    return (
      <TouchableWithoutFeedback onPress={isActive ? pauseVideo : () => playVideo(index)}>
      <View
        style={[
          styles.container,
          { height: screenHeight },
        ]}
      >
        <StatusBar barStyle={'light-content'} />

        <Video
          source={{ uri: ( item.mediaUrl) }}
          style={styles.video}
          resizeMode="contain"
          paused={!isActive || !isFocused}
          repeat
        />
        {!isFocused && !isActive && (
          <TouchableOpacity style={styles.playButton} onPress={() => playVideo(index)}>
            <Image source={images.playBtn} />
          </TouchableOpacity>
        )}
        <View style={styles.verticalBar}>
          <TouchableOpacity  
            onPress={shareVideoOnWhatsApp}
            style={styles.verticalBarItem}
            >
            <Image
              style={styles.verticalBarIcon}
              source={images.whatsapp}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={videoDownload}
            style={styles.verticalBarItem}
          >
            <Image
              style={styles.verticalBarIcon}
              source={images.download}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={shareVideo}
            style={styles.verticalBarItem}
          >
            <Image
              style={styles.verticalBarIcon}
              source={images.share}
            />
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View style={{ height: screenHeight }}>
      <Text style={styles.forYouText}>For You</Text>
      <FlatList
        data={videoData}
        pagingEnabled
        renderItem={renderItem}
        getItemLayout={(data, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
        initialScrollIndex={0}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / screenHeight);
          setActiveVideoIndex(index);
          setFocusedVideo(videoData[index]?._id);
        }}
      />
      {/* <FlatList
        data={videoData}
        pagingEnabled
        renderItem={renderItem}
        getItemLayout={(data, index) => ({
          length: screenHeight, // Height of each item
          offset: screenHeight * index, // Position of each item
          index, // Index of the item
        })}
        initialScrollIndex={0} // Set the initial index to 0
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / screenHeight);
          setActiveVideoIndex(index);
        }}
      /> */}
      <CustomLoader isVisible={videoDownloading} />
    </View>
  );
};

const styles = StyleSheet.create({
  // item: {
  //   // flex: 1,
  //   height: screenHeight,
  //   justifyContent: 'center',
  //   // alignItems: 'center',
  //   // borderBottomWidth: 1,
  //   // borderColor: 'lightgray',
  //   // backgroundColor: 'red'
  // },
  // video: {
  //   // height: '100%',
  //   height: Dimensions.get("window").height,
  //   width: screenWidth,
  //   // zIndex:1
  //   // width: Dimensions.get('window').width,
  //   // height: correctHeight,
  //   backgroundColor: '#121212'
  // },
  // playBtn: {
  //   // flex:1,
  //   // backgroundColor: 'red',
  //   zIndex: 1,
  //   position: 'absolute',
  //   top: 0,
  //   // left:0,
  //   alignSelf: 'center',
  //   marginTop: hp(45),
  //   // borderRadius: 50,
  //   height: wp(20),
  //   width: wp(20),
  //   // padding: 100
  // },
  forYouText: {
    zIndex: 1,
    position: 'absolute',
    top: hp(3),
    alignSelf: 'center',
    color: 'white',
    fontFamily: fonts.medium,
    fontSize: wp(5),
  },
  // downloadIcon: {
  //   zIndex: 1,
  //   position: 'absolute',
  //   right: wp(5),
  //   bottom: hp(25),
  //   // height:wp(6),
  //   // width:wp(6)
  // },
  // whatsapp: {
  //   zIndex: 1,
  //   position: 'absolute',
  //   right: wp(5),
  //   bottom: hp(35),
  //   // height:wp(6),
  //   // width:wp(6)
  // },
  // share: {
  //   zIndex: 1,
  //   position: 'absolute',
  //   right: wp(5),
  //   bottom: hp(15),
  //   // height:wp(6),
  //   // width:wp(6)
  // },
  // iconSize: {
  //   width: wp(6),
  //   height: wp(6),
  //   resizeMode: 'contain'
  // }
  container: {
    width: screenWidth,
    backgroundColor:'black'
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  verticalBar: {
    position: 'absolute',
    right: wp(5),
    bottom: hp(9),
  },
  verticalBarItem: {
    marginBottom: hp(5),
    alignItems: 'center',
  },
  verticalBarIcon: {
    width: wp(6),
    height: wp(6),
    resizeMode:'contain'
  },
  verticalBarText: {
    color: 'white',
    marginTop: wp(1),
    elevation:1
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default ForYou2;
