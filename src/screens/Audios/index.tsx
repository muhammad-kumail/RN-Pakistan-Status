import { View, Text, TouchableOpacity, FlatList, Image, ImageSourcePropType, TextInput } from 'react-native'
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
// import { Modalize } from 'react-native-modalize';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SearchBar } from 'react-native-screens';
import { useIsFocused } from '@react-navigation/native';
interface audioItem {
    _id: string;
    audioImg: any;
    audioUrl: string;
    title: string;
    audioImgColor: string;
    // audioImage:any
}
const Audios: React.FC<any> = ({ navigation }) => {
    const isFocused = useIsFocused();

    const [AudioData, SetAudioData] = useState<audioItem[]>([]);
    const [selectedAudio, setSelectedAudio] = useState<audioItem | null>(null);
    const [filteredData, setFilteredData] = useState(AudioData);
    const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
    // const modalRef = useRef<Modalize>(null);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        TrackPlayer.setupPlayer();
        const videos = async () => {
            try {
                const response = await getHomeAudios();
                SetAudioData(response?.data);
                console.log(response?.data)
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };
        videos();
        if(!isFocused){
            setSelectedAudio(null);
        }
    }, [isFocused]);

    const handleSearch = (text: string) => {
        setSearchQuery(text);

        // const filtered = AudioData.filter((item) =>
        //     item.title.toLowerCase().includes(text.toLowerCase())
        // );

        // setFilteredData(filtered);
    };


    // const openBottomSheet = () => {
    //     modalRef.current?.open();
    // };
    const renderItem = ({ item }: { item: audioItem }) => {

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
        }

        return (
            <TouchableOpacity
                style={{
                    height: wp(12), flexDirection: 'row', borderColor: 'black', borderWidth: 0.5,
                    alignItems: 'center', justifyContent: 'center', marginVertical: wp(1)
                }}
                onPress={() => playAudio(item.audioUrl, item.title)}>
                <View style={{ flex: 0.15 }}>
                    <Image source={{ uri: `${Config.BASE_URL}${item.audioImg}` }}
                        style={{ height: wp(12), width: wp(12), }} />
                </View>
                <View style={{ flex: 0.75 }}>
                    <Text style={{ color: isFocused ? '#B036C1' : 'white', }}>{item.title}</Text>
                    <Text style={{ color: 'grey', fontSize: wp(3) }}>{item.title}</Text>
                </View>
                <View style={{ flex: 0.1, alignItems: 'flex-end', height: wp(12), width: wp(12), justifyContent: 'center' }}>
                    <TouchableOpacity 
                    // onPress={openBottomSheet} 
                    >
                        <Image source={images.verticalDots} style={{ height: wp(4), width: wp(4), }} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    console.log('AudioData length:', AudioData);
    return (
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
                    {selectedAudio === null ?
                    null  :

                        <AudioPlayerInfo selectedAudio={selectedAudio} />
                    }

                </View>
            </View>
            {/* <Modalize
                ref={modalRef}
                modalHeight={200} // Adjust the height as needed
                >
            </Modalize> */}
        </SafeAreaView>
    )
}

export default Audios


