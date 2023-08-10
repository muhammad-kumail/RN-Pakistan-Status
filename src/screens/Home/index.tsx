import React, { useRef, useEffect,useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import VideoPlayer from 'react-native-video-controls'
import { getHomeVides } from '../../api/Httpservice';
import Config from '../../utils/config';
const screenHeight = Dimensions.get('window').height;

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
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(0)
  const [videoData, SetVideoData] = useState<VideoItem[]>([]);
  const flatListRef = useRef<FlatList<VideoItem>>(null);
  useEffect(() => {
    const videos = async () => {
      try {
        const response = await getHomeVides();
        // const videos=response;

        // if (response.data && response.data.videoContents) {
        SetVideoData(response?.data?.videoContents);
        // console.log(response?.data?.videoContents)

      } catch (error) {
        console.error('Error fetching video data:', error);
      }
      
    };
    videos();
  }, []);


  const renderItem = ({ item, index }: { item: VideoItem, index: any })  => {
      
    return (
      <View style={styles.item} key={index}>
        <VideoPlayer
          source={{uri:(Config.BASE_URL + item.mediaUrl)}}
          style={styles.video}   
          playInBackground={false}  
          playWhenInactive={true}
          paused={visibleVideoIndex === index ? false : true}   
          />
      </View>
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
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
 
  video: {
    height:"100%",
    width:'100%'
    // width: Dimensions.get('window').width,
    // height: correctHeight,
    // backgroundColor:'red'
  },
});

export default Home;
