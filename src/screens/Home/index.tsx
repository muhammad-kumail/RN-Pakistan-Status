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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <ImageBackground source={images.homeBack} style={{ height: hp(100), width: wp(100) }} >
                <View style={{flex:0.4}}>

                <TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 12 }}> Go</Text>
                </TouchableOpacity>
                </View>

                {/* <View style={styles.containers}>
                    <View style={styles.threeContainers}>
                        <View style={{backgroundColor:'grey'}}>
                            <Text>English Poetry</Text>
                            <Image style={styles.imagesSix} source={images.logo} />
                        </View>
                        <View>
                            <Text>English Poetry</Text>
                            <Image style={styles.imagesSix}  source={images.logo} />
                        </View>
                    </View>
                    <View style={styles.threeContainers}>
                        <View>
                            <Text>English Poetry</Text>
                            <Image style={styles.imagesSix}  source={images.logo} />
                        </View>
                        <View>
                            <Text>English Poetry</Text>
                            <Image style={styles.imagesSix}  source={images.logo} />
                        </View>
                    </View>
                    <View style={styles.threeContainers}>
                        <View>
                            <Text>English Poetry</Text>
                            <Image style={styles.imagesSix}  source={images.logo} />
                        </View>
                        <View>
                            <Text>English Poetry</Text>
                            <Image style={styles.imagesSix}  source={images.logo} />
                        </View>

                    </View>
                </View> */}
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Home