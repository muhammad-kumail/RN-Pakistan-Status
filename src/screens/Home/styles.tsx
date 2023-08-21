import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fonts from '../../assets/fonts/fonts';
const styles = StyleSheet.create({
    containers: {
        // backgroundColor:'red',
        // zIndex:1,
        flex: 0.6,
        // position:'absolute',
        // bottom:wp(18)
        // bottom:wp(10)
        // padding: "3%"
    },
    threeContainers: {
        flex:0.25,
        flexDirection: 'row',
        justifyContent: 'center',
        // flex:0.33,
        // height:hp(10),
        // width:hp(10),
        // backgroundColor:'red',
        // marginHorizontal:10
        // bottom:wp(1)
    },
    singleContainerPink: {
        padding: wp(2),
        width: wp(44),
        // height: wp(22),
        backgroundColor: '#B036C1',
        marginHorizontal: wp(1.5),
        marginVertical: wp(1.5),
        borderRadius: wp(1.5),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    singleContainerPurple: {
        padding: wp(2),
        width: wp(44),
        // height: wp(22),
        backgroundColor: '#9353C3',
        marginHorizontal: wp(1.5),
        marginVertical: wp(1.5),
        borderRadius: wp(1.5),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textSix: {
        color: 'white',
        fontSize: wp(3),
        fontFamily: fonts.semiBold,
        // fontWeight:'bold'
        // backgroundColor:'red'
    },
    imagesSix: {
        height: wp(13),
        width: wp(13),
        resizeMode: 'contain',
        // backgroundColor:'red'
        // marginTop: wp(5)
        // position:'absolute'
        // justifyContent:'flex-end'
    }
});

export default styles;
