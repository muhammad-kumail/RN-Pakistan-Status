import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../../assets/images/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import PoetryTypes from '../../components/TopList/TopList';
import PoetryListUrdu from '../../components/UrduPoetry/PoetryListUrdu';
import Header from '../../components/Header/Header';
import { getDataByPost } from '../../api/Httpservice';

const UrduPoetry: React.FC<any> = ({navigation}) => {
    const [types, setTypes] = useState([]);
    const [data, setData] = useState([]);
    useEffect(()=> {
        getData()
    },[])
    
    const getData =async ()=>{
        const data={
            "categoryTitle": "Urdu Poetry"
        }

        await getDataByPost(data , 'findAllMainCategory').then((res)=>{
            getContent(res.data[0]._id)
            setTypes(res.data)
            console.log("My response data",res)
        }).catch((error)=> {
            console.log("Error" , error.message)
        })
    }

    const getContent = async (id: any) => {
        const data={
            "mainCategoryId": id
        }
        await getDataByPost(data , 'getPoetry').then((res)=>{
            // getContent(res.data[0]._id)
            console.log("My response containt data",JSON.stringify(res))
            setData(res.data)
        }).catch((error)=> {
            console.log("Error" , error.message)
        })
    }


    // const types = [
    //     { id: '1', title: 'Sad Poetry' },
    //     { id: '2', title: 'Birthday Poetry' },
    //     { id: '3', title: 'Funny Poetry' },
    //     { id: '4', title: 'Friends Poetry' },
    // ];
    // const data = [
    //     { id: '1', Text: 'لہو وطن کے شہیدوں کا رنگ لایا ہے  اچھل رہا ہے زمانے میں نام آزادی لہو وطن کے شہیدوں کا رنگ لایا ہے  اچھل رہا ہے زمانے میں نام آزادی ', Image: images.Group },
    //     { id: '2', Text: 'لہو وطن کے شہیدوں کا رنگ لایا ہے  اچھل رہا ہے زمانے میں نام آزادی ', Image: images.Group },
    //     { id: '3', Text: 'لہو وطن کے شہیدوں کا رنگ لایا ہی ', Image: images.Group },
    //     { id: '4', Text: 'لہو وطن کے شہیدوں کا رنگ لایا ہے  اچھل رہا ہے زمانے میں نام آزادی ', Image: images.Group },
    //     { id: '5', Text: 'لہو وطن کے شہیدوں کا رنگ لایا ہے  اچھل رہا ہے زمانے میں نام آزادی لہو وطن کے شہیدوں کا رنگ لایا ہے  اچھل رہا ہے زمانے میں نام آزادی ', Image: images.Group },
    //     { id: '6', Text: 'لہو وطن کے شہیدوں کا رنگ لایا ہے  اچھل رہا ہے زمانے میں نام آزادی ', Image: images.Group },
    //     { id: '7', Text: 'لہو وطن کے شہیدوں کا رنگ لایا ہی ', Image: images.Group },
    //     { id: '8', Text: 'لہو وطن کے شہیدوں کا رنگ لایا ہے  اچھل رہا ہے زمانے میں نام آزادی ', Image: images.Group },
    // ];

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#121212' }}>
            <Header
                title={'Urdu Poetry'}
                leftIcon={images.back}
                leftIconPress={() => {
                    navigation.goBack();
                }}

            />
            <View style={{ flex: 0.05 }}>
                <PoetryTypes data={types} getID={getContent} />
            </View>
            <View style={{ flex: 0.95 }}>
                <PoetryListUrdu data={data} />
            </View>
        </SafeAreaView>
    )
}

export default UrduPoetry