import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Dimensions, SafeAreaView, StatusBar, Platform, Image, AppState, ViewToken } from 'react-native';
import { getHomeVides } from '../../api/Httpservice';
import Video from 'react-native-video';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createThumbnail } from 'react-native-create-thumbnail'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Config from '../../utils/config';
import { useIsFocused } from '@react-navigation/native';
import VideoPlayer from 'react-native-video-controls'
interface DrawerListProps {
  navigation: any;
}
interface VideoItem {
  _id: string;
  mediaUrl: string;
  thumbnailUri: string,
  colors: string
}
interface ColorItem {
  id: string;
  color: string;
}

const colors: ColorItem[] = [
  { id: '1', color: '#FF5733' },
  { id: '2', color: '#3498DB' },
  { id: '3', color: '#27AE60' },
  // Add more colors as needed
];
const height = Dimensions.get("window").height;
const screen=Dimensions.get("screen").height;
const isSame = height == Dimensions.get("screen").height;
const bottom=isSame? screen-height: +screen-height+(StatusBar.currentHeight ?? 0)
const correctHeight = isSame ? height - (StatusBar.currentHeight ?? 0 + bottom) : (height-bottom);


const Home: React.FC<DrawerListProps> = ({ navigation }) => {
  const [videoData, SetVideoData] = useState<VideoItem[]>([]);
  // const [isFocused, setIsFocused] = useState(true);
  const isFocused = useIsFocused()
  const [focusedVideo, setFocusedVideo] = useState<string | null>(null);
  const [Thumbnails, setThumbnails] = useState<string[]>([]);
  // -------------------------------------------

  useEffect(() => {
    const videos = async () => {
      try {
        const response = await getHomeVides();
        // const videos=response;

        // if (response.data && response.data.videoContents) {
        SetVideoData(response.data.videoContents);
        console.log(response.data.videoContents)

      } catch (error) {
        console.error('Error fetching video data:', error);
      }
      
    };
    videos();
  }, []);


  const clickPause = (mediaUrl: string) => {
    if (focusedVideo === mediaUrl) {
      setFocusedVideo(null);
    } else {
      setFocusedVideo(mediaUrl);
    }
    console.log('Focused --->', mediaUrl);
  };
  const renderVideoItem = ({ item, index }: { item: VideoItem, index: any }) => {
    // const screenVideo = focusedVideo === item.mediaUrl ? false : true && isFocused;
    // console.log( focusedVideo === item.mediaUrl ? true : false)
    // console.log("----",index)
    // const one = focusedVideo === item.mediaUrl && isFocused;
    // const two = one && isFocused
    // const isVideoFocused = focusedVideo === item.mediaUrl;
    // const shouldPlay = isVideoFocused && isFocused
    console.log(hp(100), Dimensions.get('screen').height, Dimensions.get('window').height, (StatusBar.currentHeight ?? 0) )
    console.log("bottom",bottom)
    return (
      <View style={styles.videoContainer}>
        {/* <TouchableWithoutFeedback
          onPress={() => clickPause(item.mediaUrl)}
        > */}
        {/* <Image source={{uri:Thumbnails[index]}}/> */}
        {/* <Video
            style={styles.video}
            // source={{ uri: (Config.BASE_URL + item.mediaUrl) }}
            // paused={!shouldPlay}
            // paused={index === visibleIndex ? false : true}
            repeat={true}
            resizeMode={'cover'}
            // shouldplay={}
          // volume={1}
          /> */}
          {/* <TouchableOpacity onPress={()=>clickPause(item.mediaUrl)}> */}

          <VideoPlayer
          source={{uri:(Config.BASE_URL + item.mediaUrl)}}
          style={styles.video}
          repeat={true}
          // controls={true}
          />
          {/* </TouchableOpacity> */}
        {/* <View style={ {backgroundColor:item.color, width: Dimensions.get('window').width,
    height: correctHeight,}} /> */}

        {/* </TouchableWithoutFeedback> */}
      </View>
    );
  };

  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  const calculateVisibleIndex = (contentOffsetY: number, itemHeight: number) => {
    const index = Math.floor(contentOffsetY / itemHeight);
    setVisibleIndex(index);
    console.log(index);

  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text>Welcome to Home Screen!</Text> */}
      <FlatList
        pagingEnabled={true}
        // bounces={false}
        data={videoData}
        keyExtractor={item => item._id}
        renderItem={renderVideoItem}
      // onScroll={(event) => {
      //   const contentOffsetY = event.nativeEvent.contentOffset.y;
      //   const itemHeight = hp(100); // Height of each item in the list
      //   calculateVisibleIndex(contentOffsetY, itemHeight);
      // }}
      // onViewableItemsChanged={onViewableItemsChanged}
      //   viewabilityConfig={{
      //     itemVisiblePercentThreshold: 80, // Adjust this threshold as needed
      //   }}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: Dimensions.get('window').width,
    height: correctHeight,
  },
  video: {
    width: Dimensions.get('window').width,
    height: correctHeight,
    // backgroundColor:'red'
  },
});
export default Home;



// import { View, Text } from 'react-native'
// import React from 'react'

// const Home = () => {
//   return (
//     <View>
//       <Text>index</Text>
//     </View>
//   )
// }

// export default Home