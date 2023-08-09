import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, SafeAreaView, StatusBar, Platform, Image } from 'react-native';
import { getHomeVides } from '../../api/Httpservice';
import Video from 'react-native-video';
import { FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {createThumbnail} from 'react-native-create-thumbnail'
import{
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Config from '../../utils/config';
import { useIsFocused } from '@react-navigation/native';
interface DrawerListProps {
  navigation: any;
}
interface VideoItem {
  _id: string;
  mediaUrl: string;
  thumbnailUri:string
}
const height = Dimensions.get("window").height;
const isSame = height == Dimensions.get("screen").height;
const correctHeight = isSame ? height - (StatusBar.currentHeight ?? 0) : height;


const Home: React.FC<DrawerListProps> = ({ navigation }) => {
  const [videoData, SetVideoData] = useState<VideoItem[]>([]);
  const isFocused = useIsFocused();
  const [focusedVideo, setFocusedVideo] = useState<string | null>(null);
  const [Thumbnails, setThumbnails] = useState<string[]>([]);
  // -------------------------------------------

  useEffect(() => {
    const videos = async () => {
      try{
        const response = await getHomeVides();
        if (response.data && response.data.videoContents) {
          SetVideoData(response.data.videoContents);
          generateThumbnails(response.data.videoContents); 
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
      // console.log(response.data)
      // console.log(response.data.videoContents)
    };
    const generateThumbnails = async (videos: VideoItem[]) => {
      try {
        const updatedData = await Promise.all(
          videos.map(async (item) => {
            const thumbnailUri = await createThumbnail({
              url: Config.BASE_URL + item.mediaUrl,
              timeStamp: 10000,
            });
            return thumbnailUri.path;
          })
        );

        setThumbnails(updatedData);
      } catch (error) {
        console.error('Error generating thumbnails:', error);
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
   
    return (
      <View style={styles.videoContainer}>
        <TouchableWithoutFeedback
          onPress={() => clickPause(item.mediaUrl)}
        >
          <Image source={{uri:Thumbnails[index]}}/>
          <Video
            source={{ uri: (Config.BASE_URL + item.mediaUrl) }}
            style={styles.video}
            paused={focusedVideo === item.mediaUrl ? false : true }
            repeat={true}
            resizeMode={'cover'}
            volume={1}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text>Welcome to Home Screen!</Text> */}
      <FlatList
        pagingEnabled={true}
        bounces={false}
        data={videoData}
        keyExtractor={item => item._id}
        renderItem={renderVideoItem}
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