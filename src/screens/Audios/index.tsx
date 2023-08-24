import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, PermissionsAndroid, Alert, Modal, TextInput, AppState } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { getHomeAudios } from '../../api/Httpservice';
import Header from '../../components/Header/Header';
import images from '../../assets/images/images';
import { SafeAreaView } from 'react-native';
// import Sound = require('react-native-sound');
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';
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
import Share from 'react-native-share';
import { MD3Colors, ProgressBar } from 'react-native-paper';
import * as Progress from 'react-native-progress';
// import { AppState } from '../../../Redux/Reducer/Reducer';
import fonts from '../../assets/fonts/fonts';
import styles from './styles';
import { SlideInRight } from 'react-native-reanimated';
import RNFS from 'react-native-fs'; // Import react-native-fs
import { request } from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
// import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

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
    const [audioTitles, setAudioTitles] = useState<audioItem[]>([]);
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
    const [movePosition, setMovePosition] = useState(0);
    const dispatch = useDispatch();
    // const bottomSheetRef = React.useRef<RawBottomSheet | null>(null);
    const bottomSheetRef = React.useRef<RBSheet | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuVisibleList, setMenuVisibleList] = useState<boolean[]>([]);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [isvalue, setIsValue] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    // const playbackState = usePlaybackState();
    // Initialize the menuVisibleList with false values when AudioData changes
    // useEffect(() => {
    //     setMenuVisibleList(Array(AudioData.length).fill(false));
    // }, [AudioData]);
    useEffect(() => {
        if (AudioData) {
            setMenuVisibleList(Array(AudioData.length).fill(false));
        }
        try{
            console.log(currentPosition.toFixed(1), "position");
            console.log(duration.toFixed(1), " duration");
          
            if(currentPosition.toFixed(1)===duration.toFixed(1)){
                setIsPlaying(false)
                console.log("stop now");
            }
            else{
                setIsPlaying(true)
            }
        }
        catch{
            console.log("error in to stop audio");
            
        }
    }, [AudioData,currentPosition]);


    const formatDuration = (seconds: number) => {
        const totalSeconds = Math.floor(seconds);
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = (remainingSeconds + (seconds - totalSeconds)).toFixed(0).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    };
    const seebBar = () => {
        if (currentPosition !== null && duration !== null && duration !== 0) {
            // console.log(currentPosition.toFixed(1), "position");
            // console.log(duration.toFixed(1), " duration");
          
            // console.log(currentPosition / duration,"position/duration")
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
    const shareAudio = async (url: string) => {

        try {
            console.log("whtsapp---");
            const permissionStatus = await request('android.permission.WRITE_EXTERNAL_STORAGE');

            if (permissionStatus === 'granted') {
                const audioUrl = url;
                const downloadDir = RNFS.DownloadDirectoryPath;
                const filename = `downloaded-audio-${Date.now()}.mp4`;
                const path = `${downloadDir}/${filename}`;
                try {
                    const response = await RNFS.downloadFile({
                        fromUrl: audioUrl,
                        toFile: path,
                    });

                    if (response) {
                        console.log('Image downloaded to:', path);
                        try {
                            const audio = path; // Replace with the actual path to your image
                            const shareOptions = {
                                title: 'Share via WhatsApp',
                                url: `file://${audio}`,
                                failOnCancel: false,
                                //   social: Share.Social.WHATSAPP,
                                showAppsToView: ['whatsapp'],
                            };
                            console.log(shareOptions.url, "----")

                            // await Share.shareSingle(shareOptions);
                            await Share.open(shareOptions);
                        } catch (error) {
                            console.error('Error sharing image on WhatsApp:', error.message);
                        }
                        Alert.alert('Image downloaded successfully!');
                    } else {
                        console.error('Image download failed with status:', response);
                        Alert.alert('Image download failed!');
                    }
                } catch (error) {
                    console.error('Error downloading image:', error);
                    Alert.alert('Error downloading image!');
                }
            } else {
                console.log('Permission denied');
            }
        } catch (error) {
            console.error('Error requesting permission:', error);
        }

    };
    const downloadAudio = async (url: string) => {
        console.log("is audio download?????????");

        try {
            const permissionStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            if (permissionStatus === 'granted') {

                // const audioUrl = Config.BASE_URL + url;
                const downloadDir = RNFS.DownloadDirectoryPath;
                const filename = `downloaded-audio-${Date.now()}.mp4`;
                const path = `${downloadDir}/${filename}`;
                // const path = RNFS.DocumentDirectoryPath + `/` + Math.floor(date.getTime() + date.getSeconds() / 2) + '.mp4';
                console.log("path is", path)

                await RNFetchBlob.config({
                    fileCache: true,
                    appendExt: 'mp4',
                    path: path,
                }).fetch('GET', url)
                    .then((res) => {
                        console.log('audio downloaded to:', res.path());
                    }
                    )
                    .catch((error) => {
                        console.error('Error downloading audio:', error);
                    })
            } else {
                console.log('Permission denied');
            }
        } catch (error) {
            console.error('Error requesting permission:', error);
        }
    }
    useEffect(() => {
        TrackPlayer.setupPlayer();

        const audios = async () => {
            try {
                const response = await getHomeAudios();
                SetAudioData(response?.data);
                // setAudioTitles(response?.data?.title)
                // console.log(response?.data?.title, "0909090909090")
            } catch (error) {
                console.error('Error fetching audio data:', error);
            }
        };
        // console.log(AudioData?.audioImgColor);
        audios();
        if (!isFocused) {
            setSelectedAudio(null);
            stopaudio()
            setIsPlaying(true)

        }
       
    }, [isFocused]);
    // useEffect(() => {
    //     TrackPlayer.setupPlayer().then(() => {
    //         const updateOptions = () => {
    //             let options = {
    //                 stopWithApp: true,
    //                 playIcon: images.play,
    //                 pauseIcon: images.pauseWhite,
    //                 previousIcon: images.previousPlay,
    //                 nextIcon: images.nextPlay,
    //                 // color: 'red'
    //             };

    //             TrackPlayer.updateOptions(options)
    //                 .then(() => console.log('Capabilities set'))
    //                 .catch(error => console.error('Error setting capabilities:', error));
    //         };

    //         // Call your updateOptions function
    //         updateOptions();
    //     });
    // }, []);
    useEffect(() => {
        if (isvalue === true) {
            const updatePosition = async () => {
                const newPosition = await TrackPlayer.getPosition();
                setCurrentPosition(newPosition);

                // setCurrentPosition(newPosition);
            };
            const progressInterval = setInterval(updatePosition, 1000);

            return () => clearInterval(progressInterval);
        }
        else {

        }

    }, [currentPosition, isvalue, audioTitles]);
    const setSliderPosition = async (position: number) => {
        // TrackPlayer.pause()
        const newPosition = Math.max(0, Math.min(1, position)) * duration;
        console.log(newPosition, "newwwwwwwwwww")
        setCurrentPosition(newPosition);
        console.log(currentPosition, "again newwwww");
        // TrackPlayer.pause();
        // TrackPlayer.play()
        TrackPlayer.seekTo(newPosition);
        await TrackPlayer.getPosition();
        setIsValue(true)
    };
    const stopaudio = async () => {
        await TrackPlayer.pause();
    }
    const data = () => {
        const data1 = useSelector((state: AppState) => state.app.bottomNavVisible);
        console.log("at first", data1)
    }
    const handleSearch = (text: string) => {
        setSearchQuery(text);
        // console.log(audioTitles,"data of titless")
        // const filtered = audioTitles.filter((item) =>
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
            setIsPlaying(true)
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
            setIsPlaying(true)
            if (nextAudio) {
                NextPrevAudio(nextAudio.audioUrl, nextAudio.title, nextAudio);
            }
        }
    };
    const playPreviousAudio = async () => {
        if (selectedAudioIndex !== null && selectedAudioIndex > 0) {
            const prevIndex = selectedAudioIndex - 1;
            const prevAudio = AudioData[prevIndex];
            setIsPlaying(true)
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
    const playRandomTrack = async () => {
        try {
            const randomIndex = Math.floor(Math.random() * AudioData.length);
            const randomTrack = AudioData[randomIndex];
            console.log(`${Config.BASE_URL}${randomTrack.audioUrl}`, "------")
            // await TrackPlayer.skip(randomTrack);
            const track = {
                id: randomTrack._id, // Assign an ID to the track
                url: `${Config.BASE_URL}${randomTrack.audioUrl}`,
                title: randomTrack.title, // Set title if needed
                artist: randomTrack.author, // Set artist if needed
            };

            await TrackPlayer.reset(); // Clear previous tracks
            await TrackPlayer.add([track]);
            await TrackPlayer.play();
            setIsPlaying(true)
            setSelectedAudio(randomTrack)
            setFocusedItemId(randomTrack._id);
        } catch (error) {
            console.error('Error playing random track:', error);
        }
    };
    const updateOptions = () => {
        let options = {
            stopWithApp: true,
            playIcon: images.play,
            pauseIcon: images.pauseWhite,
            previousIcon: images.previousPlay,
            nextIcon: images.nextPlay,
            color: '#FA3843'
        };

        TrackPlayer.updateOptions(options).then(() => console.log('capabilities set'));
    }
    // const setupTrackPlayer = async (audioUrl: string, title: string, audioImgColor: string) => {
    //     // Initialize TrackPlayer
    //     console.log("this is console logg okkkk");

    //     await TrackPlayer.setupPlayer();

    //     // Register the custom notification layout
    //     await TrackPlayer.updateOptions({
    //         capabilities: [
    //             TrackPlayer.CAPABILITY_PLAY,
    //             TrackPlayer.CAPABILITY_PAUSE,
    //             TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    //             TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    //         ],
    //         compactCapabilities: [
    //             TrackPlayer.CAPABILITY_PLAY,
    //             TrackPlayer.CAPABILITY_PAUSE,
    //         ],
    //         // Add other options and settings as needed

    //     });

    //     // Add your tracks and set up playback
    //     const track = {
    //         id: audioUrl,
    //         url: `${Config.BASE_URL}${audioUrl}`,
    //         title: title,
    //         audioImgColor: audioImgColor
    //     };
    //     // await TrackPlayer.reset();
    //     await TrackPlayer.add([track]);
    //     await TrackPlayer.play();
    // };
    const renderItem = ({ item, index }: { item: audioItem, index: number }) => {

        const isFocused = focusedItemId === item._id;
        const playAudio = async (audioUrl: string, title: string, audioImgColor: string) => {
            const track = {
                id: audioUrl,
                url: `${Config.BASE_URL}${audioUrl}`,
                title: title,
                audioImgColor: audioImgColor
            };
            // TrackPlayer.setupPlayer().then(() => {
            //     let options = {        // maxArtworkSize: 1000,
            //         // capabilities: [
            //         //         TrackPlayer.CAPABILITY_PLAY,
            //         //         TrackPlayer.CAPABILITY_PAUSE,
            //         //         TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            //         //         TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
            //         // ],
            //         stopWithApp: true,
            //         playIcon: images.play,
            //         pauseIcon: images.pauseWhite,
            //         previousIcon: images.previousPlay,
            //         nextIcon: images.nextPlay,
            //         // icon: require('../../img/48logo.png'),
            //         // color: '#FA3843',
            //     };
            //     TrackPlayer.updateOptions(options).then(() => console.log('capabilities set'));
            //     TrackPlayer.play();
            //     // this.getTracksFromApi()
            // });
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
            updateOptions()
            const repeatMode= await TrackPlayer.getRepeatMode()
            console.log(repeatMode," repeat mode");
            
            // setupTrackPlayer(audioUrl, title, audioImgColor);
            console.log('Playback started---:', `${Config.BASE_URL}${audioUrl}`);
            const newPosition = await TrackPlayer.getPosition();
            const newDuration = await TrackPlayer.getDuration();
            setPosition(newPosition);
            setDuration(newDuration);
            // console.log("position", newPosition);
            // console.log("duration", newDuration);
            
            const selectedAudioIndex = AudioData.findIndex(item => item.audioUrl === audioUrl);
            if (selectedAudioIndex !== -1) {
                setSelectedAudioIndex(selectedAudioIndex);
                console.log(selectedAudioIndex, "----index----")
            }
        }
        return (
            <>
                <TouchableOpacity
                    style={{
                        height: wp(12), flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'center', marginVertical: wp(1),
                    }}
                    onPress={() => playAudio(item.audioUrl, item.title, item.audioImgColor)}>
                    <View style={{ flex: 0.15 }}>
                        <Image source={{ uri: `${Config.BASE_URL}${item.audioImg}` }}
                            style={{ height: wp(12), width: wp(12), }} />
                    </View>
                    <View style={{ flex: 0.7, zIndex: 0 }}>
                        <Text numberOfLines={1} style={{ color: isFocused && (selectedAudio !== null) ? '#B036C1' : 'white', fontSize: wp(4), marginBottom: hp(1) }}>{item.title}</Text>
                        <Text style={{ color: 'grey', fontSize: wp(3) }}>{item.author}</Text>
                    </View>
                    <View style={{
                        flex: 0.15, alignItems: 'flex-end',
                        height: wp(12), width: wp(12), justifyContent: 'center'
                    }}>
                        <TouchableOpacity style={{ flex: 1, width: wp(10), alignItems: 'flex-end', justifyContent: 'center' }}
                            onPress={() => toggleMenu(index)}
                        >
                            <Image source={images.verticalDots} style={{ height: wp(4), width: wp(4), }} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                {menuVisibleList[index] && openMenuIndex === index && (
                    <View style={{
                        position: 'absolute',
                        bottom: wp(1),
                        right: wp(4),
                        borderRadius: wp(1),
                        backgroundColor: 'white',
                        padding: wp(1),
                        // zIndex: 1000
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => shareAudio(`${Config.BASE_URL}${item?.audioUrl}`)}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={images.shareBlack} style={{ height: wp(3), width: wp(3), resizeMode: 'contain' }} />
                                <Text style={{ color: 'black', paddingHorizontal: wp(2), fontFamily: fonts.poppins_regular, fontSize: wp(3.5) }}>Share</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => downloadAudio(`${Config.BASE_URL}${item?.audioUrl}`)}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={images.downloadBlack} style={{ height: wp(3), width: wp(3), resizeMode: 'contain' }} />
                                <Text style={{ color: 'black', paddingHorizontal: wp(2), fontFamily: fonts.poppins_regular, fontSize: wp(3.5) }}>Download</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </>
        );
    };

    // console.log('AudioData length:', AudioData);
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
                                    style={{ padding: wp(1), flexDirection: 'column', }}>
                                    <View style={[style.container, { backgroundColor: selectedAudio.audioImgColor }]}>
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
                                            <View style={{ flex: 0.4 }}>

                                                <Slider
                                                    // style={{width:wp(100)}}
                                                    minimumValue={0}
                                                    maximumValue={1}
                                                    value={seebBar()}
                                                    minimumTrackTintColor='white'
                                                    maximumTrackTintColor='white'
                                                    thumbTintColor='transparent'
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
                <LinearGradient
                    colors={['#000000', '#000000', selectedAudio?.audioImgColor]} // Example gradient colors
                    start={{ x: 0, y: 2.2 }} // Gradient start point
                    end={{ x: 0, y: 0 }}   // Gradient end point
                    style={{ flex: 1, }}
                >


                    {/* <View style={{ flex: 1, backgroundColor: selectedAudio?.audioImgColor }}
                > */}
                    <View style={styles.modalTop}>
                        <View style={styles.modalTopArrow}>
                            <TouchableOpacity style={{}} onPress={() => setModalVisible(false)}>
                                <Image source={images.down_Arrow} style={{ height: wp(4), width: wp(4) }} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalTopText}>
                            <Text style={{ color: 'white', fontFamily: fonts.poppins_regular, fontSize: wp(4) }}>Playing Form Playlist</Text>
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
                                        // onSlidingStart={(val) => {console.log("chf", val)
                                        // }}

                                        onSlidingComplete=
                                        // {debouncedSetSliderPosition}
                                        {value => {
                                            setSliderPosition(
                                                value
                                            )
                                        }}
                                        onSlidingStart={() => setIsValue(false)}
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
                                <TouchableOpacity onPress={playRandomTrack}>
                                    <Image source={images.link} style={styles.modalBottomSideIcons} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </Modal>
            <RBSheet
                ref={bottomSheetRef}
                closeOnDragDown={true}
                animationType="slide"
                height={wp(50)}
                customStyles={{
                    container: {
                        backgroundColor: '#121212',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                }}>
                <View style={{ flexDirection: 'column', marginHorizontal: wp(7), flex: 1 }}>
                    <View style={{ flexDirection: 'row', flex: 0.5, alignItems: 'center' }}>
                        <View style={{ flex: 0.15 }}>
                            <Image source={{ uri: `${Config.BASE_URL}${selectedAudio?.audioImg}` }}
                                style={{ height: wp(12), width: wp(12), }} />
                        </View>
                        <View style={{ flex: 0.75 }}>
                            <Text style={{ color: 'white', fontSize: wp(4) }}>{selectedAudio?.title}</Text>
                            <Text style={{ color: 'grey', fontSize: wp(2) }}>{selectedAudio?.author}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'center', }}>
                        <View style={{ flex: 0.5 }} >
                            <TouchableOpacity onPress={() => shareAudio(`${Config.BASE_URL}${selectedAudio?.audioUrl}`)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={images.shareWhite} style={{ height: wp(4), width: wp(4), resizeMode: 'contain' }} />
                                <Text style={{ color: 'white', paddingHorizontal: wp(3), fontFamily: fonts.poppins_regular }}>Share</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <TouchableOpacity onPress={() => downloadAudio(`${Config.BASE_URL}${selectedAudio?.audioUrl}`)} style={{ flexDirection: 'row', alignItems: 'center' }}>
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
        // backgroundColor: '#C12C73',
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


