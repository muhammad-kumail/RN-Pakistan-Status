
import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Config from '../../utils/config';
import images from '../../assets/images/images';
import { Touchable, } from 'react-native';
import TrackPlayer, {
} from 'react-native-track-player';

import { useIsFocused } from '@react-navigation/native';
interface AudioItem {
    title: string;
    audioImg: any;
    audioUrl: string;
    author: string
}
import { MD3Colors, ProgressBar } from 'react-native-paper';

interface AudioPlayerInfoProps {
    selectedAudio: AudioItem | null;
    new: any;
    position: any;
    duration: any
}

const AudioPlayerInfo: React.FC<AudioPlayerInfoProps> = ({ selectedAudio, new: any, position, duration }) => {
    console.log('-----', position, '-----', duration)
    if (!selectedAudio) {
        return null;
    }

    const [isPlaying, setIsPlaying] = useState(true);
    const isFocused = useIsFocused();
    const [currentPosition, setCurrentPosition] = useState(0); 

    useEffect(() => {
        console.log("whyy bro")
        const start = () => {

            TrackPlayer.setupPlayer().then(async () => {
                await TrackPlayer.reset();
            });
            setIsPlaying(true)
        }
        start()

    }, []);
    useEffect(() => {
        if (isFocused) {
            console.log("chaloo  bhaeee");
            setupPlayer();
        }
    }, [isFocused]);
    useEffect(() => {
        const updatePosition = async () => {
            const newPosition = await TrackPlayer.getPosition();
            setCurrentPosition(newPosition);
        };

        const progressInterval = setInterval(updatePosition, 1000/2); 

        return () => clearInterval(progressInterval); 
    }, []);
    const setupPlayer = async () => {
        setIsPlaying(true)

    };
    const handlePlayPause = async () => {
        if (selectedAudio) {
            if (isPlaying) {
                await TrackPlayer.pause();
                setIsPlaying(false);
            } else {
                await setupAndPlayTrack(selectedAudio);
                setIsPlaying(true);
            }
        }
    };

    const setupAndPlayTrack = async (audio: AudioItem) => {
        const track = {
            id: audio.audioUrl,
            url: `${Config.BASE_URL}${audio.audioUrl}`,
            title: audio.title,
        };
        await TrackPlayer.add([track]);
        await TrackPlayer.play();
        setIsPlaying(true);
    };

    return (
        <View style={{padding: wp(1),flexDirection:'column'}}>
            
        <View style={styles.container}>
            <View style={{ flex: 0.1 }}>
                <Image source={{ uri: `${Config.BASE_URL}${selectedAudio.audioImg}` }}
                    style={{ height: wp(9), width: wp(9), }} />
            </View>
            <View style={{
                flexDirection: 'column', flex: 0.8,
                marginHorizontal: wp(2)
            }}>
                <Text style={styles.title}>{selectedAudio.title}</Text>
                <Text style={styles.desc}>{selectedAudio.author}</Text>
                {/* <ProgressBar
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={isNaN(currentPosition) || isNaN(duration) ? 0 : currentPosition / duration}
                /> */}

            </View>
            <View style={{ flex: 0.1, alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={handlePlayPause}>
                    <Image source={isPlaying ? images.pausebtn : images.playBtn} style={{ height: wp(6), width: wp(6), }} />
                </TouchableOpacity>
            </View>
        </View>
        {/* <ProgressBar progress={currentPosition / duration} color='white'style={{backgroundColor:'rgba(255, 255, 255, 0.25)', height:wp(0.5)}}  /> */}
              
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
        height: wp(11),
        marginVertical:wp(0.5)
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
