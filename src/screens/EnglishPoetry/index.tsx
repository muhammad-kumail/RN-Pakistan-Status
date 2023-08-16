import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import PoetryTypes from './TopList';
import PoetryListEnglish from './PoetryListEnglish';
import Header from '../../components/Header/Header';

const EnglishPoetry: React.FC<any> = ({ navigation }) => {
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <Header
                title={'English Poetry'}
                leftIcon={images.back}
                // rightIcon={icons.notification}
                leftIconPress={() => {
                    navigation.goBack();
                }}

            // onPressLogo={() => alert('Bell Press')}
            />
            <View style={{ flex: 0.05 }}>
                <PoetryTypes data={types} />
            </View>
            <View style={{ flex: 0.95 }}>
                <PoetryListEnglish data={data} />
            </View>
        </SafeAreaView>
    )
}

export default EnglishPoetry