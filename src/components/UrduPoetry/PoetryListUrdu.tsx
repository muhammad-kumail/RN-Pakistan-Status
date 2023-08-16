import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from '../../screens/UrduPoetry/styles';
import fonts from '../../assets/fonts/fonts';
// import { I18nManager } from 'react-native';
interface Item {
    id: string;
    Text: string;
    Image: any;
}

interface HorizontalFlatListProps {
    data: Item[];
}

const PoetryListUrdu: React.FC<HorizontalFlatListProps> = ({ data }) => {
    // I18nManager.forceRTL(true);
    const renderItem = ({ item }: { item: Item }) => (
        <View style={{ backgroundColor: '#121212' }}>
            <TouchableOpacity style={styles.poetrylists}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.1 ,justifyContent:'center',alignItems:'flex-end',}}>
                        <Image source={item.Image} style={styles.poetryIcon}/>
                    </View>
                    <View style={styles.poetryText}>
                        <Text style={{ color: 'white', width:wp(70), fontSize:wp(3), textAlign:'right', fontFamily:fonts.poppins_regular, marginTop:3 }}>{item.Text}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
}

export default PoetryListUrdu