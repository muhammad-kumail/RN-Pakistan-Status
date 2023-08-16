import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
// import { I18nManager } from 'react-native';
interface Item {
    id: string;
    Text: string;
    Image: any;
}

interface HorizontalFlatListProps {
    data: Item[];
}

const PoetryListEnglish: React.FC<HorizontalFlatListProps> = ({ data }) => {
    // I18nManager.forceRTL(true);
    const renderItem = ({ item }: { item: Item }) => (
        <View style={{ backgroundColor: 'black' }}>
            <TouchableOpacity style={styles.poetrylists}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.poetryText}>
                        <Text style={{ color: 'white', width:wp(70), fontSize:wp(3) }}>{item.Text}</Text>
                    </View>
                    <View style={{ flex: 0.1 ,justifyContent:'center'}}>
                        <Image source={item.Image} style={styles.poetryIcon}/>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
}

export default PoetryListEnglish