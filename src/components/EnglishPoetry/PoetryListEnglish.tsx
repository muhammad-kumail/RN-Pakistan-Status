import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  // Clipboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Clipboard from '@react-native-clipboard/clipboard';
import styles from '../../screens/EnglishPoetry/styles';
import fonts from '../../assets/fonts/fonts';
import images from '../../assets/images/images';

interface Item {
  _id: string;
  content: string[];
  id: string;
  Text: string;
  Image: any;
  key:any;
}

interface HorizontalFlatListProps {
  data: Item[];
}

const PoetryListEnglish: React.FC<HorizontalFlatListProps> = ({ data }) => {
  const handleCopyToClipboard = (text: string) => {
    Clipboard.setString(text);
    // alert('Text copied to clipboard');
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={{ backgroundColor: '#121212' }}>
      <View style={styles.poetrylists}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.poetryText}>
            {item?.content?.map((contentItem: string, index: number) => {
              return (
                <View
                  key={index}
                  style={{ flex: 1 }} // Touchable area extended to the entire content width
                  // onPress={() => handleCopyToClipboard(contentItem)}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: wp(3),
                      marginTop: 3,
                      fontFamily: fonts.poppins_regular,
                    }}
                  >
                    {contentItem}
                  </Text>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={{ flex: 0.1, justifyContent: 'center' }}
            onPress={() => handleCopyToClipboard(item.content.join(' '))}
          >
            <Image source={images.Group} style={styles.poetryIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212', height: hp(100) }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item?._id}
      />
    </SafeAreaView>
  );
};

export default PoetryListEnglish;


// On your birthday I wish you much pleasure and joy; I hope all of your wishes come true. May each hour and minute be filled with delight, And your birthday be perfect for you!
