import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fonts from '../../assets/fonts/fonts';
// import colors from '../../assets/colors/colors';
// import icons from '../../assets/icons/icons';

interface HeaderProps {
    title?: string;
    titleColor?: string;
    leftIcon?: any;
    rightIcon?: any;
    rightIcon2?: any;
    leftIconPress?: () => void;
    rightIconPress?: () => void;
    rightIcon2Press?: () => void;
}

const Header: FC<HeaderProps> = ({
    title,
    titleColor,
    leftIcon,
    rightIcon,
    rightIcon2,
    leftIconPress,
    rightIconPress,
    rightIcon2Press,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftIconBox}>
                {
                    leftIcon ? (
                        <Pressable onPress={leftIconPress}>
                            <Image
                                source={leftIcon}
                                resizeMode='contain'
                                style={[styles.icon, { marginLeft: wp(4) }]}
                                tintColor={'white'}
                            />
                        </Pressable>
                    ) :
                        null
                }

            </View>
            <View style={styles.centerBox}>
                {
                    title ? (
                        <Text style={styles.title}>{title}</Text>
                    ) :
                        null
                }
            </View>
            <View style={styles.rightIconBox}>
                {
                    rightIcon ? (
                        <Pressable onPress={rightIconPress}>
                            <Image
                                source={rightIcon}
                                resizeMode='contain'
                                style={[styles.icon, { marginRight: wp(4) }]}
                                tintColor={'white'}
                            />
                        </Pressable>
                    ) :
                        null
                }
                {
                    rightIcon2 ? (
                        <Pressable onPress={rightIcon2Press}>
                            <Image
                                source={rightIcon2}
                                resizeMode='contain'
                                style={[styles.icon, { marginRight: wp(4) }]}
                                tintColor={'white'}
                            />
                        </Pressable>
                    ) :
                        null
                }
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: Platform.OS === 'ios' ? wp(2) : wp(4),
    },
    leftIconBox: {
        flex: 0.15,
        // alignItems: 'center'
    },
    rightIconBox: {
        flex: 0.15,
        alignItems: 'center'
        // justifyContent: 'flex-end',
        // flexDirection: 'row',
    },
    centerBox: {
        flex: 0.7,
        alignItems: 'center'
    },
    title: {
        fontSize: wp(5),
        // fontWeight: 'bold',
        color: 'white',
        fontFamily:fonts.medium

    },
    icon: {
        height: hp(2),
        width: wp(5),
        paddingVertical:wp(3),
    }
})
