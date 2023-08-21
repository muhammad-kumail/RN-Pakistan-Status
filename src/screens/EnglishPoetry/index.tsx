import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../../assets/images/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import PoetryTypes from '../../components/TopList/TopList';
import PoetryListEnglish from '../../components/EnglishPoetry/PoetryListEnglish';
import Header from '../../components/Header/Header';
import { getDataByPost } from '../../api/Httpservice';

const EnglishPoetry: React.FC<any> = ({ navigation }) => {
    const [types, setTypes] = useState([]);
    const [data, setData] = useState([]);
    useEffect(()=> {
        getData()
    },[])
    
    const getData =async ()=>{
        const data={
            "categoryTitle": "English Poetry"
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
                <PoetryTypes data={types} getID={getContent} />
            </View>
            <View style={{ flex: 0.95 }}>
                <PoetryListEnglish data={data} />
            </View>
        </SafeAreaView>
    )
}

export default EnglishPoetry

function getData() {
    throw new Error('Function not implemented.');
}
