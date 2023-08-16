import { View, Text, Image, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
const Home: React.FC<any> = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'red' }}>
            <ImageBackground source={images.homeBack} style={{ height: hp(100), width: wp(100) }} >
                <View style={{ flex: 0.4}}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: wp(2) }}>
                        <Text style={{ color: 'white', fontSize: wp(5), }}>Home Page</Text>
                    </View>
                </View>
                <View style={styles.containers}>
                    <Text style={{ fontSize: wp(5), color: 'white', paddingLeft: wp(3.5), paddingBottom:wp(3)}}>All Categories</Text>
                    <View style={styles.threeContainers}>
                        <TouchableOpacity onPress={()=>navigation.navigate("EnglishPoetry")} style={styles.singleContainerPink}>
                            <View style={{flex:0.7}}>
                                <Text style={styles.textSix}>English Poetry</Text>
                            </View>
                            <View style={{flex:0.3, justifyContent:'flex-end'}}>
                                <Image style={styles.imagesSix} source={images.English} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate("UrduPoetry")} style={styles.singleContainerPurple}>
                        <View style={{flex:0.7}}>
                                <Text style={styles.textSix}>Urdu Poetry</Text>
                            </View>
                            <View style={{flex:0.3, justifyContent:'flex-end'}}>
                                <Image style={styles.imagesSix} source={images.Urdu} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.threeContainers}>
                        <TouchableOpacity onPress={()=>navigation.navigate("PunjabiPoetry")} style={styles.singleContainerPurple}>
                        <View style={{flex:0.7}}>
                                <Text style={styles.textSix}>Punjabi Poetry</Text>
                            </View>
                            <View style={{flex:0.3, justifyContent:'flex-end'}}>
                                <Image style={styles.imagesSix} source={images.Punjabi} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.singleContainerPink}>
                        <View style={{flex:0.7}}>
                                <Text style={styles.textSix}>Poetry Images</Text>
                            </View>
                            <View style={{flex:0.3, justifyContent:'flex-end'}}>
                                <Image style={styles.imagesSix} source={images.Image} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.threeContainers}>
                        <View style={styles.singleContainerPink}>
                        <View style={{flex:0.7}}>
                                <Text style={styles.textSix}>Stickers</Text>
                            </View>
                            <View style={{flex:0.3, justifyContent:'flex-end'}}>
                                <Image style={styles.imagesSix} source={images.Sticker} />
                            </View>
                        </View>
                        <View style={styles.singleContainerPurple}>
                        <View style={{flex:0.7}}>
                                <Text style={styles.textSix}>Profile</Text>
                            </View>
                            <View style={{flex:0.3, justifyContent:'flex-end'}}>
                                <Image style={styles.imagesSix} source={images.Profile} />
                            </View>
                        </View>

                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Home