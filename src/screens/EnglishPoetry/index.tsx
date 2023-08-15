import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import PoetryTypes from './TopList';
import PoetryList from './PoetryList';

const Poetry: React.FC = () => {
    const types = [
        { id: '1', title: 'Sad Poetry' },
        { id: '2', title: 'Birthday Poetry' },
        { id: '3', title: 'Funny Poetry' },
        { id: '4', title: 'Friends Poetry' },
    ];
    const data = [
        { id: '1', Text: 'Tis better to have loved and lost than never to have loved at all Tis better to have loved and lost than never to have loved at all Tis better to have loved and lost than never to have loved at all', Image: images.Group },
        { id: '2', Text: 'Birthday Poetry', Image: images.Group },
        { id: '3', Text: 'Funny Poetry', Image: images.Group },
        { id: '4', Text: 'Friends Poetry', Image: images.Group },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 0.05 }}>
                <PoetryTypes data={types} />
            </View>
            <View style={{ flex: 0.95 }}>
                <PoetryList data={data} />
            </View>
        </SafeAreaView>
    )
}

export default Poetry