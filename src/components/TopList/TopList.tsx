import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../../assets/images/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from '../../screens/EnglishPoetry/styles';
import fonts from '../../assets/fonts/fonts';
interface Item {
    id: string;
    title: string;
}

interface HorizontalFlatListProps {
    data: Item[];
}

const PoetryTypes: React.FC<HorizontalFlatListProps> = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState(0)

    const renderItem = ({ item, index }: { item: Item, index: any }) => {
    console.log("Render Item", selectedItem);
        
        return (
            <View style={{backgroundColor:'#121212', justifyContent:'center',alignContent:'center'}}>
                <TouchableOpacity onPress={() => {setSelectedItem(index)}} style={[styles.topList, {backgroundColor: selectedItem === index? "#B036C1" : '#121212'}]}>
                <Text style={{color:'white', fontSize:wp(3), marginTop:3,  fontFamily:fonts.poppins_regular}}>{item.title}</Text>

                </TouchableOpacity>
            </View>
        )
    }
    ;

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