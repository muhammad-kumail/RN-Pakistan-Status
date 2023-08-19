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
import { setBottomNavVisibility } from '../../../Redux/Actions/Actions';
import { SET_BOTTOM_NAV_VISIBILITY } from '../../../Redux/Actions/types';
// import { Modalize } from 'react-native-modalize';
import Menu, { MenuItem } from 'react-native-material-menu';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SearchBar } from 'react-native-screens';
import { useIsFocused } from '@react-navigation/native';
// import BottomSheet from '@gorhom/bottom-sheet';
// import RawBottomSheet from 'react-native-raw-bottom-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';

import { AppState } from '../../../Redux/Reducer/Reducer';
import fonts from '../../assets/fonts/fonts';

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
    const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [selectedAudioInfo, setSelectedAudioInfo] = useState<{
        audioImg: string;
        title: string;
        author: string;
    } | null>(null);
    const dispatch = useDispatch();
    // const bottomSheetRef = React.useRef<RawBottomSheet | null>(null);
    // const bottomSheetRef = React.useRef<RBSheet | null>(null);
    // const openBottomSheet = () => {
    //     dispatch({ type: SET_BOTTOM_NAV_VISIBILITY, payload: true });
    //     bottomSheetRef.current?.expand();
    // };

    // const closeBottomSheet = () => {
    //     dispatch({ type: SET_BOTTOM_NAV_VISIBILITY, payload: false });
    //     bottomSheetRef.current?.close();
    //     console.log("true")
    // };
    // const openBottomSheet = (audioImg: string, title: string, author: string) => {
    //     if (bottomSheetRef.current) {
    //         dispatch({ type: SET_BOTTOM_NAV_VISIBILITY, payload: true });
    //         bottomSheetRef.current.open();
    //         setSelectedAudioInfo({ audioImg, title, author });
    //     }
    // };

    // const closeBottomSheet = () => {
    //     if (bottomSheetRef.current) {
    //         dispatch({ type: SET_BOTTOM_NAV_VISIBILITY, payload: false });
    //         bottomSheetRef.current.close();
    //     }
    // };

    // const [menuVisible, setMenuVisible] = useState(false);
    // const menuRef = useRef<AudioMenu | null>(null);
    // const showMenu = () => {
    //     if (menuRef.current) {
    //         menuRef.current.show();
    //     }
    // };

    // const hideMenu = () => {
    //     if (menuRef.current) {
    //         menuRef.current.hide();
    //     }
    // };

    // const handleMenuPress = () => {
    //     if (menuRef.current) {
    //         if (menuVisible) {
    //             hideMenu();
    //         } else {
    //             showMenu();
    //         }
    //     }
    // };
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuVisibleList, setMenuVisibleList] = useState<boolean[]>([]);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

    const [isPlaying, setIsPlaying] = useState(true);
    // Initialize the menuVisibleList with false values when AudioData changes
    // useEffect(() => {
    //     setMenuVisibleList(Array(AudioData.length).fill(false));
    // }, [AudioData]);
    useEffect(() => {
        if (AudioData) { // Check if AudioData is defined
            setMenuVisibleList(Array(AudioData.length).fill(false));
        }
    }, [AudioData]);


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
        audios();
        if (!isFocused) {
            setSelectedAudio(null);
            stopvideo()
        }
    }, [isFocused]);
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
    const renderItem = ({ item, index }: { item: audioItem, index: number }) => {

        const isFocused = focusedItemId === item._id;
        const playAudio = async (audioUrl: string, title: string) => {
            const track = {
                id: audioUrl,
                url: `${Config.BASE_URL}${audioUrl}`,
                title: title,

            };
            console.log("------------", `${Config.BASE_URL}${item.audioImg}`);

            await TrackPlayer.reset();
            console.log('Adding track to queue...');
            console.log(`${Config.BASE_URL}/${audioUrl}`);

            await TrackPlayer.add([track]);

            console.log('Starting playback...');
            await TrackPlayer.play();
            await TrackPlayer.setVolume(0.5);
            setSelectedAudio(item);
            setFocusedItemId(item._id);
            console.log('Playback started:');
            const newPosition = await TrackPlayer.getPosition();
            const newDuration = await TrackPlayer.getDuration();
            setPosition(newPosition);
            setDuration(newDuration);
            console.log("position", newPosition);
            console.log("duration", newDuration);
        }

        return (
            <TouchableOpacity
                style={{
                    height: wp(12), flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'center', marginVertical: wp(1)
                }}
                onPress={() => playAudio(item.audioUrl, item.title)}>
                <View style={{ flex: 0.15 }}>
                    <Image source={{ uri: `${Config.BASE_URL}${item.audioImg}` }}
                        style={{ height: wp(12), width: wp(12), }} />
                </View>
                <View style={{ flex: 0.75 }}>
                    <Text style={{ color: isFocused && (selectedAudio !== null) ? '#B036C1' : 'white', }}>{item.title}</Text>
                    <Text style={{ color: 'grey', fontSize: wp(3) }}>{item.author}</Text>
                </View>
                <View style={{
                    flex: 0.1, alignItems: 'flex-end',
                    height: wp(12), width: wp(12), justifyContent: 'center'
                }}>
                    <TouchableOpacity style={{ flex: 1, width: wp(10), alignItems: 'flex-end', justifyContent: 'center' }}
                        // onPress={() => openBottomSheet(item.audioImg, item.title, item.author)}
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
                        // rightIcon={icons.notification}
                        leftIconPress={() => {
                            navigation.goBack();
                        }}
                    />
                    <View style={{ flex: 0.06, justifyContent: 'center', }}>
                        <TextInput
                            style={{
                                fontSize: wp(3.5), borderRadius: wp(1), paddingBottom: 0, paddingTop: 0,
                                borderWidth: 1, backgroundColor: 'white', paddingLeft: wp(10), // 
                            }}
                            placeholder="Find in Playlist"
                            onChangeText={(text) => handleSearch(text)}
                            value={searchQuery}
                        // <Image source={images.Profile}/>
                        />
                        <Icon name="search" size={20} style={{ position: 'absolute', paddingLeft: wp(2) }} />
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
                                <AudioPlayerInfo
                                    selectedAudio={selectedAudio}
                                    new={true}
                                    position={position}
                                    duration={duration}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>


            </SafeAreaView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    {/* Place your audio player interface or component here */}

                    {/* Close button */}
                    <View style={{
                        backgroundColor: 'grey', flexDirection: 'row', flex: 0.05,
                        paddingHorizontal: wp(5), paddingVertical: wp(5)
                    }}>
                        <View style={{ flex: 0.25, alignItems: 'flex-start', justifyContent: 'center' }}>
                            <TouchableOpacity style={{}} onPress={() => setModalVisible(false)}>
                                <Image source={images.downArrow} style={{ height: wp(4), width: wp(4) }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white',fontFamily:fonts.poppins_regular }}>Playing Form Playlist</Text>
                        </View>
                        <View style={{ flex: 0.25, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <TouchableOpacity style={{}}>
                                <Image source={images.verticalDots} style={{ height: wp(4), width: wp(4) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 0.55, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: `${Config.BASE_URL}${selectedAudio?.audioImg}` }}
                            style={{ height: wp(70), width: wp(70), borderRadius: wp(2) }} />
                    </View>
                    <View style={{ flex: 0.4, backgroundColor: 'purple' }}>
                        <View style={{
                            flexDirection: 'column', flex: 0.4,backgroundColor:'purple',
                            paddingHorizontal: wp(4),justifyContent:'center', alignItems:'flex-start'
                        }}>
                            <View style={{flex:0.4}}>
                            <Text style={styles.title}>{selectedAudio?.title}</Text>
                            <Text style={styles.desc}>{selectedAudio?.author}</Text>

                            </View>
                            <View style={{flexDirection:'row',backgroundColor:'red',flex:0.4,
                             justifyContent:'flex-end'}}>
                                <View style={{flex:0.15}}>

                                <Text style={{color:'white'}}>00:00</Text>
                                </View>
                                <View style={{flex:0.7}}>
                                <Text>-------------

                                </Text>

                                </View>
                                <View style={{flex:0.15}}>

                                <Text style={{color:'white'}}>{duration}</Text>
                                </View>
                            </View>


                        </View>
                        <View style={{flex:0.6,backgroundColor:'blue'}}>
                        <TouchableOpacity onPress={handlePlayPause}>
                    <Image source={isPlaying ? images.pausebtn : images.playBtn} style={{ height: wp(6), width: wp(6), }} />
                </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Modal>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({

    title: {
        color: 'white',
        fontSize: wp(4),
        fontWeight: 'bold',

    },
    desc: {
        fontSize: wp(3),
        color: 'white'
    }
});
export default Audios


