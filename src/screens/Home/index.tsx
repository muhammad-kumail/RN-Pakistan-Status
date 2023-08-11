import React, { useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import VideoPlayer from 'react-native-video-controls'
import { getHomeVides } from '../../api/Httpservice';
import Config from '../../utils/config';
import images from '../../assets/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
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
const data: Item[] = [
  { id: '1', content: 'Item 1 Content', color: '#FF5733' },
  { id: '2', content: 'Item 2 Content', color: '#3498DB' },
  { id: '3', content: 'Item 3 Content', color: '#27AE60' },
  { id: '4', content: 'Item 1 Content', color: '#FF5733' },
  { id: '5', content: 'Item 2 Content', color: '#3498DB' },
  { id: '6', content: 'Item 3 Content', color: '#27AE60' },
  // ... Add more items
];


const Home = () => {
  const [check, setCheck] = useState(false)
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(0)
  const [videoData, SetVideoData] = useState<VideoItem[]>([]);
  const [focusedVideo, setFocusedVideo] = useState<string | null>(null);
  const flatListRef = useRef<FlatList<VideoItem>>(null);
  const [img, setImg] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true);
  useEffect(() => {
    const videos = async () => {
      try {
        const response = await getHomeVides();
        SetVideoData(response?.data?.videoContents);
        console.log(response?.data?.videoContents)
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
    const handleVideoPress = () => {
      setCheck(!check);
      console.log("Video Pressed");
    };
    return (
      <View style={styles.item}>
        {img &&
          <Image source={images.playBtn} style={styles.playBtn} />
        }
        
         {videoLoading &&
            <ActivityIndicator
                // animating
                color={"grey"}
                size="large"
                style={{ flex: 1, position:"absolute", top:"50%", left:"45%" }}
            />
        }
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
            resizeMode={'cover'}
            onLoad={() => setVideoLoading(true)}

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
  );
};

const styles = StyleSheet.create({
  item: {
    // flex: 1,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderColor: 'lightgray',
    // backgroundColor: 'red'
  },

  video: {
    height: screenHeight,
    width: screenWidth,
    // zIndex:1
    // width: Dimensions.get('window').width,
    // height: correctHeight,
    // backgroundColor: 'grey'
  },
  playBtn: {
    // flex:1,
    // backgroundColor: 'red',
    zIndex: 1,
    position: 'absolute',
    alignItems: 'center',
    // marginTop: hp(50),
    borderRadius: 50,
    // height: wp(70),
    // width: wp(70),
    // padding: 100
  }
});

export default Home;
