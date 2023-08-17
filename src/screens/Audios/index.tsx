import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getHomeAudios } from '../../api/Httpservice';
import Header from '../../components/Header/Header';
import images from '../../assets/images/images';
import { SafeAreaView } from 'react-native';
// import Sound = require('react-native-sound');
import TrackPlayer, { Capability } from 'react-native-track-player';
import { Button } from 'react-native';
import Config from '../../utils/config';
import AudioPlayerInfo from './AudioPlayerInfo';
interface audioItem {
    _id: string;
    audioImg: string;
    audioUrl: string;
    title: string;
    audioImgColor: string
}
const Audios: React.FC<any> = ({ navigation }) => {

    const [AudioData, SetAudioData] = useState<audioItem[]>([]);
    const [selectedAudio, setSelectedAudio] = useState<audioItem | null>(null);

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

    }, []);

    const renderItem = ({ item }: { item: audioItem }) => {

        const playAudio = async (audioUrl: string, title: string) => {
            const track = {
                id: audioUrl,
                url: `${Config.BASE_URL}${audioUrl}`,
                title: title,
            };

            await TrackPlayer.reset();
            console.log('Adding track to queue...' );
            console.log(`${Config.BASE_URL}/${audioUrl}`);
            
            await TrackPlayer.add([track]);

            console.log('Starting playback...');
            await TrackPlayer.play();
            await TrackPlayer.setVolume(0.5);
            setSelectedAudio(item);
            console.log('Playback started:');
        }

        return (
            <TouchableOpacity
                style={{ backgroundColor: 'grey', height: 50, borderWidth: 5 }}
                onPress={() => playAudio(item.audioUrl, item.title)}>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    console.log('AudioData length:', AudioData);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <Header
                title={'Audios'}
                leftIcon={images.back}
                // rightIcon={icons.notification}
                leftIconPress={() => {
                    navigation.goBack();
                }}
            />

            <FlatList
                data={AudioData}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
            <AudioPlayerInfo selectedAudio={selectedAudio} />
        </SafeAreaView>
    )
}

export default Audios


