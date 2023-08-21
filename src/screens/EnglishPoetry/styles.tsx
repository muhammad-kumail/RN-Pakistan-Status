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
    topList: {
        borderRadius: wp(5),
        borderWidth: wp(0.2),
        // backgroundColor: '#121212',
        marginHorizontal: wp(1),
        borderColor: '#FFFFFF',
        paddingHorizontal: wp(3),
        paddingVertical:wp(0.5),
    },
    poetrylists:
    {
        marginHorizontal: wp(3),
        borderRadius: wp(1),
        borderWidth: wp(0.1),
        marginVertical: wp(1),
        backgroundColor: '#121212',
        // marginHorizontal: wp(1),
        // borderColor: '#E3E3E3',
        borderColor:'rgba(255,255,255,0.21)'
        // paddingHorizontal: wp(5),
        // paddingVertical:wp(3)
    },
    poetryIcon: {
        width: wp(7),
        height: wp(7),

    },
    poetryText: {
        flex: 0.9,
        paddingVertical: wp(3),
        justifyContent: 'center',
        marginHorizontal: wp(3)
    }

});

export default styles;
