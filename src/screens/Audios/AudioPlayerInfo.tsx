
import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Config from '../../utils/config';
import images from '../../assets/images/images';
import { Touchable, } from 'react-native';
import TrackPlayer, {
} from 'react-native-track-player';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
interface AudioItem {
    audioImgColor: any;
    title: string;
    audioImg: any;
    audioUrl: string;
    author: string;
    
}
import { MD3Colors, ProgressBar } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './styles';
import fonts from '../../assets/fonts/fonts';

interface AudioPlayerInfoProps {
    selectedAudio: AudioItem | null;
    AudioData:any;
    new: any;
    position: any;
    duration: any;
    playing:any
}

const AudioPlayerInfo: React.FC<AudioPlayerInfoProps> = ({ selectedAudio, new: any, position, duration , playing}) => {
    console.log('-----', position, '-----', duration)
    console.log("iss audio playing", playing);
    
    if (!selectedAudio) {
        return null;
    }
    const [selectedAudioInfo, setSelectedAudioInfo] = useState<{
        audioImg: string;
        title: string;
        author: string;
        // audioImgColor:any
    } | null>(null);
    const bottomSheetRef = React.useRef<RBSheet | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const isFocused = useIsFocused();
    const [currentPosition, setCurrentPosition] = useState(0); 
    // const [modalVisible, setModalVisible] = useState(false);
    // const [selectedAudioIndex, setSelectedAudioIndex] = useState<number | null>(null);
    // const [selectedAudio, setSelectedAudio] = useState<AudioItem | null>(null);
    // const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
    // const [position, setPosition] = useState(0);
    // const [duration, setDuration] = useState(0);
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
        // console.log(playing,"plzzz")

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
    // const openBottomSheet = (audioImg: string, title: string, author: string) => {
    //     if (bottomSheetRef.current) {
    //         // dispatch({ type: SET_BOTTOM_NAV_VISIBILITY, payload: true });
    //         bottomSheetRef.current.open();
    //         setSelectedAudioInfo({ audioImg, title, author, });
    //     }
    // };
    // const playNextAudio = async () => {
    //     if (selectedAudioIndex !== null && selectedAudioIndex < AudioData.length - 1) {
    //         const nextIndex = selectedAudioIndex + 1;
    //         const nextAudio = AudioData[nextIndex];
    //         if (nextAudio) {
    //             playAudio(nextAudio.audioUrl, nextAudio.title, nextAudio);
    //         }
    //     }
    // };
    // const playPreviousAudio = async () => {
    //     if (selectedAudioIndex !== null && selectedAudioIndex > 0) {
    //         const prevIndex = selectedAudioIndex - 1;
    //         const prevAudio = AudioData[prevIndex];
    //         if (prevAudio) {
    //             playAudio(prevAudio.audioUrl, prevAudio.title, prevAudio);
    //         }
    //     }
    // };
    // const playAudio = async (audioUrl: string, title: string, AudioItem: AudioItem,) => {
    //     const track = {
    //         id: audioUrl,
    //         url: `${Config.BASE_URL}${audioUrl}`,
    //         title: title,

    //     };
    //     console.log("------------", `${Config.BASE_URL}${AudioItem.audioImg}`);

    //     await TrackPlayer.reset();
    //     console.log('Adding track to queue...');
    //     console.log(`${Config.BASE_URL}/${audioUrl}`);

    //     await TrackPlayer.add([track]);

    //     console.log('Starting playback...');
    //     await TrackPlayer.play();
    //     await TrackPlayer.setVolume(0.5);
    //     setSelectedAudio(AudioItem);
    //     setFocusedItemId(AudioItem._id);
    //     console.log('Playback started:');
    //     const newPosition = await TrackPlayer.getPosition();
    //     const newDuration = await TrackPlayer.getDuration();
    //     setPosition(newPosition);
    //     setDuration(newDuration);
    //     console.log("position", newPosition);
    //     console.log("duration", newDuration);

    //     const selectedAudioIndex = AudioData.findIndex((item: { audioUrl: string; }) => item.audioUrl === audioUrl);
    //     if (selectedAudioIndex !== -1) {
    //         setSelectedAudioIndex(selectedAudioIndex);
    //         console.log(selectedAudioIndex, "----index----")
    //     }


    // }
    return (
       

        <View
        //  onPress={() => setModalVisible(true)} 
        style={{padding: wp(1),flexDirection:'column'}}>
            
        <View style={style.container}>
            <View style={{ flex: 0.1 }}>
                <Image source={{ uri: `${Config.BASE_URL}${selectedAudio.audioImg}` }}
                    style={{ height: wp(9), width: wp(9), }} />
            </View>
            <View style={{
                flexDirection: 'column', flex: 0.8,
                marginHorizontal: wp(2)
            }}>
                <Text style={style.title}>{selectedAudio.title}</Text>
                <Text style={style.desc}>{selectedAudio.author}</Text>
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

const style = StyleSheet.create({
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
