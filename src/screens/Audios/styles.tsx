import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fonts from '../../assets/fonts/fonts';
const styles = StyleSheet.create({
    searchBarText: {
        fontSize: wp(3.5),
        borderRadius: wp(1),
        paddingBottom: 0,
        paddingTop: 0,
        borderWidth: 1,
        backgroundColor: 'white',
        paddingLeft: wp(10), // 
    },
    searchBarIcon: {
        position: 'absolute',
        paddingLeft: wp(2)
    },
    title: {
        color: 'white',
        fontSize: wp(4),
        fontWeight: 'bold',
    },
    desc: {
        fontSize: wp(3),
        color: 'white'
    },
    modalTop: {
        flexDirection: 'row', flex: 0.05,
        paddingHorizontal: wp(5), paddingVertical: wp(5)
    },
    modalTopArrow: {
        flex: 0.25,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    modalTopText: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalTopOption: {
        flex: 0.25,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    modalCenter: {
        flex: 0.55,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalCenterImg: {
        height: wp(70),
        width: wp(70),
        borderRadius: wp(2)
    },
    modalAudioDetail: {
        flexDirection: 'column',
        flex: 0.4,
        paddingHorizontal: wp(4),
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor:'green'
    },
    modalPlaybtn: {
        height: wp(12),
        width: wp(12),
        backgroundColor: 'black',
        borderRadius: wp(10),
        marginHorizontal: wp(4)
    },
    modalBottomIcons: {
        flex: 0.6,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    modalBottomSideIcons: {
        height: wp(5),
        width: wp(5),
        marginHorizontal: wp(4)
    },
    modalNextPrev: {
        height: wp(9),
        width: wp(9),
        marginHorizontal: wp(3),
        borderRadius:wp(2)
    }
});

export default styles;
