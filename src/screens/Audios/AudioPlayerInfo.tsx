// AudioPlayerInfo.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
interface AudioItem {
  title: string;
  // Add other properties as needed
}

interface AudioPlayerInfoProps {
  selectedAudio: AudioItem | null;
}

const AudioPlayerInfo: React.FC<AudioPlayerInfoProps> = ({ selectedAudio }) => {
  if (!selectedAudio) {
    return null; // Don't render if no audio is selected
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedAudio.title}</Text>
      {/* Add other information here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backgroundColor:'red',
    position: 'absolute',
    bottom: wp(15),
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AudioPlayerInfo;
