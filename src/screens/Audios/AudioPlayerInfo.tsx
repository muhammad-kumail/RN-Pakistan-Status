// AudioPlayerInfo.tsx

import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Config from '../../utils/config';
import images from '../../assets/images/images';
import { Touchable } from 'react-native';
interface AudioItem {
    title: string;
    audioImg: any;
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
            <View style={{flex:0.1}}>

                <Image source={{ uri: `${Config.BASE_URL}${selectedAudio.audioImg}` }}
                    style={{ height: wp(9), width: wp(9), }} />
            </View>
            <View style={{ flexDirection: 'column', flex:0.8,
             marginHorizontal: wp(2) }}>
                <Text style={styles.title}>{selectedAudio.title}</Text>
                <Text style={styles.desc}>{selectedAudio.title}</Text>
            </View>
            <View style={{flex:0.1,alignItems:'flex-end'}}>
                <TouchableOpacity>
                <Image source={images.playBtn} style={{height: wp(6), width: wp(6),}} />
                </TouchableOpacity>
            </View>
            {/* Add other information here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C12C73',
        // flex:0.2,
        // backgroundColor:'red',
        position: 'absolute',
        bottom: wp(0.5),
        left: 0,
        right: 0,
        padding: wp(1),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: wp(1),
        height: wp(10)
    },
    title: {
        color: 'white',
        fontSize: wp(3),
        fontWeight: 'bold',

    },
    desc: {
        fontSize: wp(2),
        color: 'white'
    }
});

export default AudioPlayerInfo;
