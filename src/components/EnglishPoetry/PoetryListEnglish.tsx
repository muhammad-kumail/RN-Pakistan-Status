import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Clipboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from '../../screens/EnglishPoetry/styles';
import fonts from '../../assets/fonts/fonts';
import images from '../../assets/images/images';

interface Item {
  content: string[];
  id: string;
  Text: string;
  Image: any;
}

interface HorizontalFlatListProps {
  data: Item[];
}

const PoetryListEnglish: React.FC<HorizontalFlatListProps> = ({ data }) => {
  const handleCopyToClipboard = async (text: string) => {
    await Clipboard.setString(text);
    alert('Text copied to clipboard');
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={{ backgroundColor: '#121212' }}>
      <View style={styles.poetrylists}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.poetryText}>
            {item?.content?.map((contentItem: string, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{ flex: 1 }} // Touchable area extended to the entire content width
                  onPress={() => handleCopyToClipboard(contentItem)}
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
                </TouchableOpacity>
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
        keyExtractor={(item) => item?.id}
      />
    </SafeAreaView>
  );
};

export default PoetryListEnglish;
