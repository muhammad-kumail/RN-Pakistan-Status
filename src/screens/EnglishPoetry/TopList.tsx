import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
interface Item {
    id: string;
    title: string;
}

interface HorizontalFlatListProps {
    data: Item[];
}

const PoetryTypes: React.FC<HorizontalFlatListProps> = ({ data }) => {
    const renderItem = ({ item }: { item: Item }) => (
        <View style={{backgroundColor:'#121212', justifyContent:'center',alignContent:'center'}}>
            <TouchableOpacity style={styles.topList}>
            <Text style={{color:'white', fontSize:wp(3)}}>{item.title}</Text>

            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor:'black'}}>
            <FlatList
                horizontal
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
}

export default PoetryTypes