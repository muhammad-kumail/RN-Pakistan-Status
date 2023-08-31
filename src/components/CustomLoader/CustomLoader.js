import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CustomLoader = ({ isVisible }) => {
    return (
      <Modal visible={isVisible} transparent={true}>
        <View style={styles.container}>
          <ActivityIndicator color={'#B036C1'} size={'large'} />
        </View>
      </Modal>
    );
}

export default CustomLoader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
})