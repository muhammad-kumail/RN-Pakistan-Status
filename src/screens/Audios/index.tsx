import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ImageSourcePropType, TextInput, Modal } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { getHomeAudios } from '../../api/Httpservice';
import Header from '../../components/Header/Header';
import images from '../../assets/images/images';
import { SafeAreaView } from 'react-native';
// import Sound = require('react-native-sound');
import TrackPlayer, { Capability } from 'react-native-track-player';
import { Button } from 'react-native';
import Config from '../../utils/config';
import AudioPlayerInfo from './AudioPlayerInfo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
// import { setBottomNavVisibility } from '../../../Redux/Actions/Actions';
// import { SET_BOTTOM_NAV_VISIBILITY } from '../../../Redux/Actions/types';
// import { Modalize } from 'react-native-modalize';
// import Menu, { MenuItem } from 'react-native-material-menu';
import Slider from '@react-native-community/slider';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SearchBar } from 'react-native-screens';
import { useIsFocused } from '@react-navigation/native';
// import BottomSheet from '@gorhom/bottom-sheet';
// import RawBottomSheet from 'react-native-raw-bottom-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';

import { MD3Colors, ProgressBar } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import { AppState } from '../../../Redux/Reducer/Reducer';
import fonts from '../../assets/fonts/fonts';
import styles from './styles';
import { SlideInRight } from 'react-native-reanimated';

interface audioItem {
    _id: string;
    audioImg: any;
    audioUrl: string;
    title: string;
    audioImgColor: string;
    author: string
    // audioImage:any
}
interface AudioMenu {
    show: any;
    hide: any
}
const Audios: React.FC<any> = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [AudioData, SetAudioData] = useState<audioItem[]>([]);
    const [selectedAudio, setSelectedAudio] = useState<audioItem | null>(null);
    const [filteredData, setFilteredData] = useState(AudioData);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [selectedAudioInfo, setSelectedAudioInfo] = useState<{
        audioImg: string;
        title: string;
        author: string;
        // audioImgColor:any
    } | null>(null);
    const [selectedAudioIndex, setSelectedAudioIndex] = useState<number | null>(null);

    const dispatch = useDispatch();
    // const bottomSheetRef = React.useRef<RawBottomSheet | null>(null);
    const bottomSheetRef = React.useRef<RBSheet | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuVisibleList, setMenuVisibleList] = useState<boolean[]>([]);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const [currentPosition, setCurrentPosition] = useState(0);

    const [isPlaying, setIsPlaying] = useState(true);
    // Initialize the menuVisibleList with false values when AudioData changes
    // useEffect(() => {
    //     setMenuVisibleList(Array(AudioData.length).fill(false));
    // }, [AudioData]);
    useEffect(() => {
        if (AudioData) {
            setMenuVisibleList(Array(AudioData.length).fill(false));
        }
    }, [AudioData]);

    const formatDuration = (seconds: number) => {
        const totalSeconds = Math.floor(seconds);
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;
      
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = (remainingSeconds + (seconds - totalSeconds)).toFixed(0).padStart(2, '0');
      
        return `${formattedMinutes}:${formattedSeconds}`;
      };
    const seebBar = () => {
        if (position !== null && duration !== null && duration !== 0) {
            console.log(position / duration)
            return currentPosition / duration;
        }
        return 0;
    }
    const toggleMenu = (index: number) => {
        if (openMenuIndex !== null) {
            setMenuVisibleList(prevMenuVisibleList => {
                const updatedMenuVisibleList = [...prevMenuVisibleList];
                updatedMenuVisibleList[openMenuIndex] = false;
                return updatedMenuVisibleList;
            });
        }

        setOpenMenuIndex(index);
        setMenuVisibleList(prevMenuVisibleList => {
            const updatedMenuVisibleList = [...prevMenuVisibleList];
            updatedMenuVisibleList[index] = true;
            return updatedMenuVisibleList;
        });
    };
    // const toggleMenu = () => {
    //     setMenuVisible(!menuVisible);
    // };
    useEffect(() => {
        TrackPlayer.setupPlayer();
        const audios = async () => {
            try {
                const response = await getHomeAudios();
                SetAudioData(response?.data);
                console.log(response?.data)
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };
        // console.log(AudioData?.audioImgColor);
        audios();
        if (!isFocused) {
            setSelectedAudio(null);
            stopvideo()
            setIsPlaying(true)

        }
    }, [isFocused]);
    useEffect(() => {
        const updatePosition = async () => {
            const newPosition = await TrackPlayer.getPosition();
            setCurrentPosition(newPosition);
        };

        const progressInterval = setInterval(updatePosition, 1000);

        return () => clearInterval(progressInterval);
    }, []);
    const setupPlayer = async () => {
        setIsPlaying(true)

    };
    const stopvideo = async () => {
        await TrackPlayer.pause();
    }
    const data = () => {
        const data1 = useSelector((state: AppState) => state.app.bottomNavVisible);
        console.log("at first", data1)
    }
    const handleSearch = (text: string) => {
        setSearchQuery(text);

        // const filtered = AudioData.filter((item) =>
        //     item.title.toLowerCase().includes(text.toLowerCase())
        // );

        // setFilteredData(filtered);
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
    const handleRepeat = async () => {
        if (selectedAudio) {
            await TrackPlayer.reset()
            await setupAndPlayTrack(selectedAudio);
        }
    };
    const setupAndPlayTrack = async (audio: audioItem) => {
        const track = {
            id: audio.audioUrl,
            url: `${Config.BASE_URL}${audio.audioUrl}`,
            title: audio.title,
        };
        await TrackPlayer.add([track]);
        await TrackPlayer.play();
        setIsPlaying(true);
    };
    const NextPrevAudio = async (audioUrl: string, title: string, audioItem: audioItem,) => {
        const track = {
            id: audioUrl,
            url: `${Config.BASE_URL}${audioUrl}`,
            title: title,

        };
        console.log("------------", `${Config.BASE_URL}${audioItem.audioImg}`);

        await TrackPlayer.reset();
        // console.log(`${Config.BASE_URL}/${audioUrl}`);
        await TrackPlayer.add([track]);
        await TrackPlayer.play();
        await TrackPlayer.setVolume(0.5);
        setSelectedAudio(audioItem);
        setFocusedItemId(audioItem._id);
        const newPosition = await TrackPlayer.getPosition();
        const newDuration = await TrackPlayer.getDuration();
        setPosition(newPosition);
        setDuration(newDuration);
        console.log("position", newPosition);
        console.log("duration", newDuration);

        const selectedAudioIndex = AudioData.findIndex(item => item.audioUrl === audioUrl);
        if (selectedAudioIndex !== -1) {
            setSelectedAudioIndex(selectedAudioIndex);
            console.log(selectedAudioIndex, "----index----")
        }


    }
    const playNextAudio = async () => {
        if (selectedAudioIndex !== null && selectedAudioIndex < AudioData.length - 1) {
            const nextIndex = selectedAudioIndex + 1;
            const nextAudio = AudioData[nextIndex];
            if (nextAudio) {
                NextPrevAudio(nextAudio.audioUrl, nextAudio.title, nextAudio);
            }
        }
    };
    const playPreviousAudio = async () => {
        if (selectedAudioIndex !== null && selectedAudioIndex > 0) {
            const prevIndex = selectedAudioIndex - 1;
            const prevAudio = AudioData[prevIndex];
            if (prevAudio) {
                NextPrevAudio(prevAudio.audioUrl, prevAudio.title, prevAudio);
            }
        }
    };
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds - minutes * 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    const openBottomSheet = (audioImg: string, title: string, author: string) => {
        if (bottomSheetRef.current) {
            // dispatch({ type: SET_BOTTOM_NAV_VISIBILITY, payload: true });
            bottomSheetRef.current.open();
            setSelectedAudioInfo({ audioImg, title, author, });
        }
    };

    const renderItem = ({ item, index }: { item: audioItem, index: number }) => {

        const isFocused = focusedItemId === item._id;
        const playAudio = async (audioUrl: string, title: string, audioImgColor: string) => {
            const track = {
                id: audioUrl,
                url: `${Config.BASE_URL}${audioUrl}`,
                title: title,
                audioImgColor: audioImgColor
            };
            console.log("------------", `${Config.BASE_URL}${item.audioImg}`);
            await TrackPlayer.reset();
            console.log(`${Config.BASE_URL}/${audioUrl}`);
            await TrackPlayer.add([track]);
            console.log('color is----', audioImgColor);
            await TrackPlayer.play();
            await TrackPlayer.setVolume(0.5);
            setSelectedAudio(item);
            setFocusedItemId(item._id);
            setIsPlaying(true)
            console.log('Playback started---:', `${Config.BASE_URL}${audioUrl}`);
            const newPosition = await TrackPlayer.getPosition();
            const newDuration = await TrackPlayer.getDuration();
            setPosition(newPosition);
            setDuration(newDuration);
            console.log("position", newPosition);
            console.log("duration", newDuration);

            const selectedAudioIndex = AudioData.findIndex(item => item.audioUrl === audioUrl);
            if (selectedAudioIndex !== -1) {
                setSelectedAudioIndex(selectedAudioIndex);
                console.log(selectedAudioIndex, "----index----")
            }
        }
        return (
            <TouchableOpacity
                style={{
                    height: wp(12), flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'center', marginVertical: wp(1)
                }}
                onPress={() => playAudio(item.audioUrl, item.title, item.audioImgColor)}>
                <View style={{ flex: 0.15 }}>
                    <Image source={{ uri: `${Config.BASE_URL}${item.audioImg}` }}
                        style={{ height: wp(12), width: wp(12), }} />
                </View>
                <View style={{ flex: 0.75 }}>
                    <Text style={{ color: isFocused && (selectedAudio !== null) ? '#B036C1' : 'white', fontSize: wp(4) }}>{item.title}</Text>
                    <Text style={{ color: 'grey', fontSize: wp(3) }}>{item.author}</Text>
                </View>
                <View style={{
                    flex: 0.1, alignItems: 'flex-end',
                    height: wp(12), width: wp(12), justifyContent: 'center'
                }}>
                    <TouchableOpacity style={{ flex: 1, width: wp(10), alignItems: 'flex-end', justifyContent: 'center' }}
                        onPress={() => toggleMenu(index)}
                    >
                        <Image source={images.verticalDots} style={{ height: wp(4), width: wp(4), }} />
                    </TouchableOpacity>
                </View>
                {menuVisibleList[index] && openMenuIndex === index && (
                    <View style={{
                        position: 'absolute',
                        top: wp(8),
                        right: wp(3),
                        borderRadius: wp(1), backgroundColor: 'white',
                        padding: wp(1)
                    }}
                    >

                        <View>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={images.shareBlack} style={{ height: wp(4), width: wp(4), resizeMode: 'contain' }} />
                                <Text style={{ color: 'black', paddingHorizontal: wp(3), fontFamily: fonts.poppins_regular }}>Share</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={images.downloadBlack} style={{ height: wp(4), width: wp(4), resizeMode: 'contain' }} />
                                <Text style={{ color: 'black', paddingHorizontal: wp(3), fontFamily: fonts.poppins_regular }}>Download</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    console.log('AudioData length:', AudioData);
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ backgroundColor: '#121212', flex: 1, paddingHorizontal: wp(3) }}>
                <View style={{ flex: 0.9, }}>
                    <Header
                        title={'Audio'}
                        leftIcon={images.back}
                        leftIconPress={() => {
                            navigation.goBack();
                        }}
                    />
                    <View style={{ flex: 0.06, justifyContent: 'center', }}>
                        <TextInput
                            style={styles.searchBarText}
                            placeholder="Find in Playlist"
                            onChangeText={(text) => handleSearch(text)}
                            value={searchQuery}
                        />
                        <Icon name="search" size={20} style={styles.searchBarIcon} />
                    </View>
                    <View style={{ flex: 0.94 }}>
                        <FlatList
                            data={AudioData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id}
                        />
                    </View>
                    <View >

                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            {selectedAudio === null ? null : (
                                // <AudioPlayerInfo
                                // AudioData={AudioData}
                                //     selectedAudio={selectedAudio}
                                //     new={true}
                                //     position={position}
                                //     duration={duration}
                                //     playing={isPlaying}
                                // />
                                <View
                                    //  onPress={() => setModalVisible(true)} 
                                    style={{ padding: wp(1), flexDirection: 'column' }}>
                                    <View style={style.container}>
                                        <View style={{ flex: 0.1 }}>
                                            <Image source={{ uri: `${Config.BASE_URL}${selectedAudio.audioImg}` }}
                                                style={{ height: wp(9), width: wp(9), }} />
                                        </View>
                                        <View style={{
                                            flexDirection: 'column', flex: 0.8,
                                            marginHorizontal: wp(2),
                                        }}>
                                            <View style={{ flex: 0.6 }}>

                                                <Text style={style.title}>{selectedAudio.title}</Text>
                                                <Text style={style.desc}>{selectedAudio.author}</Text>
                                            </View>
                                            {/* <ProgressBar
                                            styleAttr="Horizontal"
                                            indeterminate={false}
                                            progress={isNaN(currentPosition) || isNaN(duration) ? 0 : currentPosition / duration}
                                        /> */}
                                            <View style={{ flex: 0.4 }}>

                                                <Slider
                                                    // style={{width:wp(100)}}
                                                    minimumValue={0}
                                                    maximumValue={1}
                                                    value={seebBar()}
                                                    minimumTrackTintColor='white'
                                                    maximumTrackTintColor='white'
                                                    thumbTintColor='transparent'
                                                    onValueChange={value => {
                                                        setCurrentPosition(
                                                            value
                                                        )

                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.1, alignItems: 'flex-end' }}>
                                            <TouchableOpacity onPress={handlePlayPause}>
                                                <Image source={isPlaying ? images.pausebtn : images.playBtn}
                                                    style={{ height: wp(6), width: wp(6), }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {/* <ProgressBar progress={currentPosition / duration} color='white'style={{backgroundColor:'rgba(255, 255, 255, 0.25)', height:wp(0.5)}}  /> */}
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={{ flex: 1, backgroundColor: selectedAudio?.audioImgColor }}>
                    <View style={styles.modalTop}>
                        <View style={styles.modalTopArrow}>
                            <TouchableOpacity style={{}} onPress={() => setModalVisible(false)}>
                                <Image source={images.downArrow} style={{ height: wp(4), width: wp(4) }} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalTopText}>
                            <Text style={{ color: 'white', fontFamily: fonts.poppins_regular, fontSize: wp(3) }}>Playing Form Playlist</Text>
                        </View>
                        <View style={styles.modalTopOption}>
                            <TouchableOpacity style={{}} onPress={() => openBottomSheet(selectedAudio?.audioImg, selectedAudio?.title, selectedAudio?.author)} >
                                <Image source={images.verticalDotsWhite} style={{ height: wp(4), width: wp(4), resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.modalCenter}>
                        <Image source={{ uri: `${Config.BASE_URL}${selectedAudio?.audioImg}` }}
                            style={styles.modalCenterImg} />
                    </View>
                    <View style={{ flex: 0.4, }}>
                        <View style={styles.modalAudioDetail}>
                            <View style={{
                                flex: 0.4, marginLeft: wp(2
                                )
                            }}>
                                <Text style={styles.title}>{selectedAudio?.title}</Text>
                                <Text style={styles.desc}>{selectedAudio?.author}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row', flex: 0.4, width: wp(90),
                                justifyContent: 'center', alignItems: 'center',
                            }}>
                                <View style={{ marginHorizontal: wp(0), }}>
                                    <Text style={{ color: 'white' }}>{formatDuration(currentPosition)}</Text>
                                </View>
                                <View style={{ marginHorizontal: wp(0) }}>
                                    <Slider
                                        style={{ width: wp(65), }}
                                        minimumValue={0}
                                        maximumValue={1}
                                        value={seebBar()}
                                        minimumTrackTintColor='white'
                                        maximumTrackTintColor='white'
                                        thumbTintColor='transparent'
                                        // '#B036C1'

                                        onValueChange={value => {
                                            setCurrentPosition(
                                                value
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ marginHorizontal: wp(0) }}>

                                    <Text style={{ color: 'white' }}>{formatDuration(duration)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.modalBottomIcons}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={handleRepeat}>
                                    <Image source={images.repeat} style={styles.modalBottomSideIcons} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={playPreviousAudio}>
                                    <Image source={images.previousPlay} style={styles.modalNextPrev} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handlePlayPause}>
                                    <Image source={isPlaying ? images.pauseWhite : images.playWhite}
                                        style={styles.modalPlaybtn} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={playNextAudio}>
                                    <Image source={images.nextPlay} style={styles.modalNextPrev} />
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Image source={images.link} style={styles.modalBottomSideIcons} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <RBSheet
                ref={bottomSheetRef}
                closeOnDragDown={true}
                animationType="slide"
                height={wp(40)}
                customStyles={{
                    container: {
                        backgroundColor: '#121212',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                }}>
                <View style={{ flexDirection: 'column', marginHorizontal: wp(7), flex: 1 }}>
                    <View style={{ flexDirection: 'row', flex: 0.6, alignItems: 'center' }}>
                        <View style={{ flex: 0.15 }}>
                            <Image source={{ uri: `${Config.BASE_URL}${selectedAudio?.audioImg}` }}
                                style={{ height: wp(12), width: wp(12), }} />
                        </View>
                        <View style={{ flex: 0.75 }}>
                            <Text style={{ color: 'white', fontSize: wp(4) }}>{selectedAudio?.title}</Text>
                            <Text style={{ color: 'grey', fontSize: wp(2) }}>{selectedAudio?.author}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.4, justifyContent: 'center', }}>
                        <View style={{ flex: 0.5 }} >
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={images.shareWhite} style={{ height: wp(4), width: wp(4), resizeMode: 'contain' }} />
                                <Text style={{ color: 'white', paddingHorizontal: wp(3), fontFamily: fonts.poppins_regular }}>Share</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={images.downloadWhite} style={{ height: wp(4), width: wp(4), resizeMode: 'contain' }} />
                                <Text style={{ color: 'white', paddingHorizontal: wp(3), fontFamily: fonts.poppins_regular }}>Download</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </RBSheet>
        </GestureHandlerRootView>
    )
}
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
        marginVertical: wp(0.5)
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
export default Audios


