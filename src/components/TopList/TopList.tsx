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
    _id: string;
    title: string;
}

interface HorizontalFlatListProps {
    data: Item[];
    getID: (_id:any) => void;
}

const PoetryTypes: React.FC<HorizontalFlatListProps> = ({ data, getID}) => {    
    const [selectedItem, setSelectedItem] = useState(0)

    const renderItem = ({ item, index }: { item: Item, index: any }) => {
        
        return (
            <View key={index} style={{backgroundColor:'#121212', justifyContent:'center',alignContent:'center'}}>
                <TouchableOpacity onPress={() => {setSelectedItem(index), getID(item?._id)}} style={[styles.topList, {backgroundColor: selectedItem === index? "#B036C1" : '#121212'}]}>
                <Text style={{color:'white', fontSize:wp(3), marginTop:3,  fontFamily:fonts.poppins_regular}}>{item.title}</Text>

                </TouchableOpacity>
            </View>
        )
    }
    ;   

    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor:'#121212'}}>
            <FlatList
                horizontal
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </SafeAreaView>
    )
}

export default PoetryTypes