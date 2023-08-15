import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    containers:{
        // backgroundColor:'red',
        // zIndex:1,
        flex:0.6,
        padding:"3%"
    },
    threeContainers:{
        flexDirection:'row',
        // height:hp(10),
        // width:hp(10),
        backgroundColor:'red'
    },
    imagesSix:{
        height:wp(30),
        width:wp(30)
    }
});

export default styles;
